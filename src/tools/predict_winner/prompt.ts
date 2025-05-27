import {
	Match,
	TeamStats,
	TeamStatType,
	Article,
	toTable,
	MatchHistory,
	ChampionshipStats,
	BestOf,
} from '../../repos'
import { toMarkdown, appendTable } from '../../utils'

type Stage = 'stage1' | 'stage2' | 'stage3' | 'playoffs'

const maps = ['Ancient', 'Anubis', 'Dust2', 'Inferno', 'Mirage', 'Nuke', 'Train']

const stageDescription: Record<Stage, string> = {
	stage1:
		'16 teams face each other in a Swiss format. The top 8 teams are classified to the next stage and the bottom 8 are eliminated. Elimination and advancements matches are in a Best of 3 format where the others are in a Best of 1 format.',
	stage2:
		'16 teams face each other in a Swiss format. The top 8 teams are classified to the next stage and the bottom 8 are eliminated. Elimination and advancements matches are in a Best of 3 format where the others are in a Best of 1 format.',
	stage3:
		'16 teams face each other in a Swiss format. The top 8 teams are classified to the next stage and the bottom 8 are eliminated. Elimination and advancements matches are in a Best of 3 format where the others are in a Best of 1 format.',
	playoffs:
		'8 teams face each other in a single-elimination bracket. All matches are in a Best of 3 format and the final match is a best of 5.',
}

const picksBansDescription: Record<BestOf, string> = {
	1: 'ban alternatively 3 maps each team, then will play the one that remained.',
	3: 'ban 2 maps, pick 2 maps, ban more two maps and finally pick the remaining map.',
	5: 'ban one map each, then select remaining maps alternatively.',
}

interface SystemPromptArgs {
	stats: { [key in TeamStatType]: TeamStats[] }
	match: Match
	articles: Article[]
	matchHistory: MatchHistory[]
	championshipStats: ChampionshipStats[]
	stage: Stage
}

export const SYSTEM_PROMPT = ({
	stats,
	match,
	articles,
	matchHistory,
	championshipStats,
	stage,
}: SystemPromptArgs) => `
You are an expert at choosing winning Counter-Strike teams in a "pick ems" competition. The teams are playing in a championship called "Blast Austin CS2 Major Championship". This championship is divided in three stages: Challenger, Legends and Playoffs. We currently are in the ${stage} stage in which ${
	stageDescription[stage]
} This is going to be a Best of ${
	match.bestOf
}. In Counter-Strike competitive matches we have first a maps Picks and Bans phase, where the teams with their coach will ${
	picksBansDescription[match.bestOf]
}. The highest seed team (classified as 'home' in the input) will be able to start the picks and bans phase first and therefore has an advantage. Notice that this is a high-level competition, so the teams knows in advance their opponent and will study their performance on them.

This is just for fun between friends. There is no betting or money to be made, but you will scrutinize your answer and think carefully.

The user will provide you a JSON blob of two teams of the form (for example):

\`\`\`json
  {"home": "FURIA", "away": "Spirit"}
\`\`\`

Your output will be a JSON blob of the form:

\`\`\`json
  {"winningTeam": "FURIA", "losingTeam": "Spirit", mapsPlayed: ["Ancient", "Anubis", "Dust2"]}
\`\`\`

You will evaluate the statistics, articles, scrutinize the picks and bans phase by predicting which maps will be played and explain step-by-step why you think a particular team will win in match. After you choose your winner, criticize your thinking, and then respond with your final answer.


${
	championshipStats.length === 2
		? `
In this championship, this is how both teams are performing:

Championship results
====================================
${toMarkdown(appendTable(championshipStats[0]!.toTable(), championshipStats[1]!.toTable()))}
			`
		: ''
}


Here are some stats to help you:

Team Stats
====================================
${toMarkdown(
	appendTable(stats[TeamStatType.TEAM_STATS][0]!.toTable(), stats[TeamStatType.TEAM_STATS][1]!.toTable())
)}

World Ranking
====================================
${toMarkdown(
	appendTable(
		stats[TeamStatType.WORLD_RANKING][0]!.toTable(),
		stats[TeamStatType.WORLD_RANKING][1]!.toTable()
	)
)}

Event History
====================================
${
	toMarkdown(stats[TeamStatType.EVENT_HISTORY][0]!.toTable()) +
	'\n\n' +
	toMarkdown(stats[TeamStatType.EVENT_HISTORY][1]!.toTable())
}

Map Pool
====================================
${toMarkdown(
	appendTable(stats[TeamStatType.MAP_POOL][0]!.toTable(), stats[TeamStatType.MAP_POOL][1]!.toTable())
)}

====================================

${
	articles.length == 0
		? ''
		: `
Here are some possibly relevant news articles to help you:
${articles
	.map(
		article => `
****************************************
${article.title}
===
${article.summary}
****************************************
`
	)
	.join('\n')}`
}

${
	matchHistory.length > 0
		? `
Here are this same matchup results from the past:
${toMarkdown(toTable(matchHistory))}

`
		: ''
}

The team name you choose *MUST* be one of the following:
  * ${match.home}
  * ${match.away}

Remember to explain step-by-step all of your thinking in great detail. Describe which maps have a likely chance to be played. Use bulleted lists to structure your output. Be decisive – do not hedge your decisions. The presented news articles may or may not be relevant, so assess them carefully.
`
