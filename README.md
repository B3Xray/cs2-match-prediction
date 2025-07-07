# :gun: CS2 Match Prediction

This is A LLM Agent that predict the outcome of a professional Counter-Strike 2 match. It analyzes the recent news for each team and all the stats to give a precise prediction.

## Getting Started

To get started, you first need to clone the code and install the dependencies.

```sh
$ git clone git@github.com:luizcieslak/cs2-match-prediction.git
$ cd cs2-match-prediction
$ pnpm install
```

Then create a `.env` file in the root of the project from `.env.example` file and tweak it to your needs.
Notice the repo support LLMs besides OpenAI, as long as they are compatible with its API.

Finally, on [src/repos/matches/repo.ts](https://github.com/luizcieslak/cs2-match-prediction/blob/a8001afd842a0698aaec327bc08ec7ce8dbdf811/src/repos/matches/repo.ts#L20), add the matches you want to predict in the following format: 

```ts
new Match(team1, team2, bestOf)
```

And then you can run the agent with:

```
$ npm run start
```

It may take several minutes to complete. It analyzes many articles and matches
and each call to the LLM may take upwards of ~30 seconds to complete. So be
patient.

## Blast Austin 2025 Major Championship

As a way of test its accuracy, I've used the [Blast Austin 2025 Major Championship](https://www.hltv.org/events/8436/blasttv-austin-major-2025-stage-1) and predicted its outcome using several LLM models. You can check the results [here](https://github.com/luizcieslak/cs2-match-prediction/blob/main/results/README.md).

## How Does It Work?

At a high-level, the agent crawls a bunch of statistics and news articles on
HLTV's website. For each match it will feed the LLM
stats and news relevant to that match and have it predict a winner.

The data retrieval is done by scraping HLTV pages (built using
[Playwright](https://playwright.dev/)).

The data analysis is done by the LLM.

The general division here is that anything that can be done more-or-less
deterministically in code, we should do in code. And fallback to the LLM for
very specific tasks that are fuzzy, non-deterministic, and don't lend
themselves to code due to their ambiguous or difficult-to-code nature.

### Scrapers

The scrapers know how to retrieve:

- The articles mentioning a determined CS2 team. [Example for FaZe team](https://www.hltv.org/team/6667/faze#tab-newsBox)
- Overview Stats for a CS2 team. [Example for NAVI team.](https://www.hltv.org/stats/teams/4608/natus-vincere)
- Event history a CS2 team. [Example for NAVI team.](https://www.hltv.org/stats/teams/events/4608/natus-vincere)
- Previous matchups between two teams. [Example for FaZe versus NAVI](https://www.hltv.org/results?startDate=2023-06-18&endDate=2025-06-18&team=6667&team=4608&requireAllTeams=)
- Map Pool stats for a CS2 team. [Example for The MongolZ team.](https://www.hltv.org/stats/teams/maps/6248/the-mongolz)

## Agents

The agents know how to:

- **Analyze News**: Take a news article and extract:

  1. A summary of the article.
  2. key elements that can make the team win - member trades, stats and results.

  Whenever we provide an article to the agent to summary, we also provide which is the team the agent needs to look for in order to provide the elements above.

- **Predict a Winner**: Given both teams that are competing in PGL Major Championship Copenhagen 2024, the format of match they will perform
  plus each teams Stats: KDA ratio, win rate, event history, matchup history, map pool stats
  along with any relevant news we can find for them
  analyze that data to make a prediction about who will win and also which maps will be played.

## Architectural Patterns

This is heavily based on a fork of Steve Krenzel's [pick-ems](https://github.com/stevekrenzel/pick-ems) LLM agent that originally predicts winners for NFL games. The code was modified to handle CS2 games but most of the architecture is the same.

There are a few key architectural patterns we use in this repo. One for data
retrieval, one for working with LLMs, and one for managing the flow of data
between the two.

### Additional features added from the fork

- [Patchright](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright-nodejs) instead of the default Playwright is required to scrape HLTV's website (🙏 thank you HLTV for letting us scrape your website, your content rocks and for decades it's been the go-to place everyone goes when we talk about Counter-Strike.)
- Cached article analysis in JSON files (so my OpenAI billing doesn't skyrocket)
- feeding back results in each round as another stat for the subsequent ones.

### Data Access

Web scraping can be messy business, so we attempt to hide the browser from the
rest of our code as quickly as possible. The end goal is to basically access
the content from the various webpages the same way we would access data from
an API or a database. To that end, we use a [Data Mapper Pattern](https://en.wikipedia.org/wiki/Data_mapper_pattern)
where each kind of data (e.g. `Article`, `Match`, `Team`, etc...) has a `Repo`
and an `Entity`. The `Entity` contains all of the fields of data that we want
that domain object to have. The `Repo` is how we retrieve and access the data.

The `repos` are structured in such a way that if you just use the objects
without peeking behind the scenes, you'd have no idea that you weren't
querying a database of some sort (though, an admittedly slow database).

### Agents

Bridging the gap between nice well-defined data and fuzzy natural language can
be a bit tricky. To help address this, we rely on OpenAI's ability to call
[tools/functions](https://platform.openai.com/docs/guides/function-calling).
We don't actually care about the tool itself. We pass OpenAI exactly one tool,
force it to use that tool, and the only bit of the tool we care about are the
parameters of the tool. This is the data that we are seeking from the LLM. The
tool definition is just a means for us to provide OpenAI a nice
[JSONSchema](https://json-schema.org/) that will influence the shape of the
data the LLM returns to us.

Note: The LLM may return something that doesn't match our schema, but with
GPT-4 this is exceedingly uncommon (at least for our use case).

Each agent is broken up into 3 parts: `Prompt`, `Schema`, `Tool`.

- The `Prompt` instructs the LLM on what its task is and how it should
  achieve it.
- The `Schema` instructs the LLM on what data we expect it to return to us.
- The `Tool` retrieves any data the LLM might need for its task and calls
  the LLM with the prompt, data, and schema and wraps it all in a nice
  function that abstracts away the details. A user can call a tool just like
  any other function and they can be oblivious to the fact that the `string`
  or `boolean` they got back required the processing power of 1,000 remote
  GPUs.

#### Analysis and Conclusions

One other pattern we use, that may be non-obvious, is that we wrap the
`tool`'s schema in a parent schema that has a field called `analysis` and a
field called `conclusion`. The `conclusion` field isn't particularly notable
and simply maps to the `tool`'s schema. The `analysis` is the notable one
here. Importantly, The field is generated **first** by the LLM and is a way
for the LLM to "think" out loud and reference that thinking in the subsequent
generation of the data in the `conclusion`.

A lot of LLM techniques, like [Chain-of-Thought
(CoT)](https://en.wikipedia.org/wiki/Prompt_engineering#Chain-of-thought)
require that the LLM generates a sequence of tokens that it can then reference
on for its final answer. If your `Prompt` to the `Tool` asks the LLM to use
any strategy like this, and you don't give it a scratchpad of sorts to write
in, then it won't be able to use that pattern. So this `analysis` field is a
scratchpad that we offer to the LLM to write whatever it needs to before
answering our prompt.

tl;dr; If you ask the LLM to return `true` or `false`, and you instruct it to
think carefully about the choice beforehand, but you don't give it space to
do that thinking then it won't be able to and instead will just return a boolean
without thinking carefully about it.

**This pattern meaningfully improves the results of the payloads.**

### Model-View-Controller

Finally, we've got data retrieval and we've got agents, but how do we think about
the interplay between the two? We draw inspiration from the
[Model-View-Controller (MVC)](https://en.wikipedia.org/wiki/Model-view-controller) pattern.

In this case, our:

- `Models` map to `Repos`
- `Views` map to `Prompts`
- `Controllers` map to `Tools`

The `Tool` is the thing that coordinates retrieving data from the `Repos` and
then rendering that data into a `Prompt` prior to sending it to our "client", the
LLM.

The analogy is not perfect, and starts to stretch under scrutiny, but as a
rough guide on how to think about the division of labor between the
components, I find it useful.
