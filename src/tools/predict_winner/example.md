You are an expert at choosing winning Counter-Strike teams in a "pick ems" competition. The teams are playing in a championship called "PGL CS2 Major Championship". This championship is divided in three stages: Challenger, Legends and Playoffs. We currently are in the challenger stage in which 16 teams face each other in a Swiss format. The top 8 teams are classified to the next stage and the bottom 8 are eliminated. Elimination and advancements matches are in a Best of 3 format where the others are in a Best of 1 format. This is going to be a Best of 1. In Counter-Strike competitive matches we have first a maps Picks and Bans phase, where the teams with their coach will ban alternatively 3 maps each team, then will play the one that remained.. The highest seed team will be able to start the picks and bans phase first and therefore has an advantage. Notice that this is a high-level competition, so the teams knows in advance their opponent and will study their performance on them.

This is just for fun between friends. There is no betting or money to be made, but you will scrutinize your answer and think carefully.

The user will provide you a JSON blob of two teams of the form (for example):

```json
{ "home": "FURIA", "away": "Spirit" }
```

Your output will be a JSON blob of the form:

```json
{ "winningTeam": "FURIA", "losingTeam": "Spirit", "mapsPlayed": ["Ancient", "Anubis", "Dust2"] }
```

You will evaluate the statistics, articles, scrutinize the picks and bans phase by predicting which maps will be played and explain step-by-step why you think a particular team will win in match. After you choose your winner, criticize your thinking, and then respond with your final answer.

Here are some stats to help you:

# Team Stats

| Team       | Win rate           | Kill death ratio |
| ---------- | ------------------ | ---------------- |
| Complexity | 55.3030303030303%  | 1.03             |
| OG         | 55.55555555555556% | 1.01             |

# World Ranking

| Team       | World Ranking |
| ---------- | ------------- |
| Complexity | #16           |
| OG         | #40           |

# Event History

| Team       | IEM Melbourne 2025 | BLAST.tv Austin Major 2025 North America Regional Qualifier | PGL Bucharest 2025 | YaLLa Compass Spring 2025 Closed Qualifier | PGL Bucharest 2025 North America Closed Qualifier | PGL Cluj-Napoca 2025 | IEM Katowice 2025 Play-in | BLAST Bounty 2025 Season 1 | Perfect World Shanghai Major 2024 Opening Stage | Perfect World Shanghai Major 2024 Americas RMR | IEM Rio 2024 | ESL Pro League Season 20 | BLAST Premier Fall Showdown 2024 | IEM Cologne 2024 | IEM Cologne 2024 Play-in | BLAST Premier Fall Groups 2024 | Esports World Cup 2024 |
| ---------- | ------------------ | ----------------------------------------------------------- | ------------------ | ------------------------------------------ | ------------------------------------------------- | -------------------- | ------------------------- | -------------------------- | ----------------------------------------------- | ---------------------------------------------- | ------------ | ------------------------ | -------------------------------- | ---------------- | ------------------------ | ------------------------------ | ---------------------- |
| Complexity | 9-12th             | 1-2nd                                                       | 4th                | 1-2nd                                      | 1st                                               | 12-14th              | 13-16th                   | 17-32nd                    | 9-11th                                          | 3-5th                                          | 9-12th       | 9-12th                   | 5-8th                            | 9-12th           | 1-4th                    | 7-8th                          | 12-15th                |

| Team | CCT Season 3 Europe Series 1 | A1 Gaming League Season 10 | Thunderpick World Championship 2025 European Series 1 | BLAST.tv Austin Major 2025 Europe Regional Qualifier | PGL Astana 2025 Europe Closed Qualifier | Galaxy Battle 2025 STARTER | CCT Season 2 Europe Series 20 | PGL Bucharest 2025 Europe Closed Qualifier | CCT Season 2 Europe Series 20 Closed Qualifier | CCT Season 2 Europe Series 19 Closed Qualifier | IEM Dallas 2025 Europe Closed Qualifier | PGL Bucharest 2025 Europe Open Qualifier 2 | CCT Season 2 Europe Series 17 | PGL Bucharest 2025 Europe Open Qualifier 1 | IEM Dallas 2025 Europe Open Qualifier | CCT Season 2 Europe Series 16 | A1 Gaming League Season 9 | YaLLa Compass Fall 2024 | Hellcase Cup 11 | Thunderpick World Championship 2024 Finals | Thunderpick World Championship 2024 | CCT Season 2 Europe Series 14 | ESL Challenger Katowice 2024 Europe Closed Qualifier | Elisa Invitational Fall 2024 | Thunderpick World Championship 2024 EU Closed Qualifier 2 | IEM Rio 2024 Europe Closed Qualifier | BLAST Premier Fall Showdown 2024 | Perfect World Shanghai Major 2024 EU RMR Closed Qualifier B | IEM Rio 2024 Europe Open Qualifier 1 | BLAST Premier Fall Groups 2024 |
| ---- | ---------------------------- | -------------------------- | ----------------------------------------------------- | ---------------------------------------------------- | --------------------------------------- | -------------------------- | ----------------------------- | ------------------------------------------ | ---------------------------------------------- | ---------------------------------------------- | --------------------------------------- | ------------------------------------------ | ----------------------------- | ------------------------------------------ | ------------------------------------- | ----------------------------- | ------------------------- | ----------------------- | --------------- | ------------------------------------------ | ----------------------------------- | ----------------------------- | ---------------------------------------------------- | ---------------------------- | --------------------------------------------------------- | ------------------------------------ | -------------------------------- | ----------------------------------------------------------- | ------------------------------------ | ------------------------------ |
| OG   | 3-4th                        | 5-8th                      | 5-8th                                                 | 1-2nd                                                | 25-32nd                                 | 9-16th                     | 1st                           | 2nd                                        | 1-4th                                          | 5-8th                                          | 13-16th                                 | 1st                                        | 17-19th                       | 9-16th                                     | 1-4th                                 | 9-16th                        | 5-8th                     | 16-18th                 | 5-8th           | 4th                                        | 1-4th                               | 9-16th                        | 7-8th                                                | 3-4th                        | 9-16th                                                    | 7-8th                                | 3-4th                            | 9-11th                                                      | 1-2nd                                | 13-16th                        |

# Map Pool

| Team       | Ancient                                                                                                                                                                                                                                                                                            | Anubis                                                                                                                                                                                                                                                                                           | Dust2                                                                                                                                                                                                                                                                                             | Inferno                                                                                                                                                                                                                                                                                           | Nuke                                                                                                                                                                                                                                                                                              | Train                                                                                                                                                                                                                                                                                             |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Complexity | Rounds won: 278, Times played: 24, Wins / draws / losses: 13 / 0 / 11, Total rounds played: 524, Win percent: 54.2%, Pistol rounds: 48, Pistol rounds won: 30, Pistol round win percent: 62.5%, CT round win percent: 56.9%, T round win percent: 49.0%, Pick percent: 5.4%, Ban percent: 27.2%,   | Rounds won: 403, Times played: 35, Wins / draws / losses: 22 / 0 / 13, Total rounds played: 763, Win percent: 62.9%, Pistol rounds: 70, Pistol rounds won: 38, Pistol round win percent: 54.3%, CT round win percent: 46.8%, T round win percent: 59.6%, Pick percent: 41.0%, Ban percent: 1.2%, | Rounds won: 185, Times played: 17, Wins / draws / losses: 6 / 0 / 11, Total rounds played: 400, Win percent: 35.3%, Pistol rounds: 34, Pistol rounds won: 13, Pistol round win percent: 38.2%, CT round win percent: 43.1%, T round win percent: 49.3%, Pick percent: 4.5%, Ban percent: 25.3%,   | Rounds won: 138, Times played: 13, Wins / draws / losses: 5 / 0 / 8, Total rounds played: 282, Win percent: 38.5%, Pistol rounds: 26, Pistol rounds won: 13, Pistol round win percent: 50.0%, CT round win percent: 47.9%, T round win percent: 50.4%, Pick percent: 9.3%, Ban percent: 17.6%,    | Rounds won: 142, Times played: 13, Wins / draws / losses: 7 / 0 / 6, Total rounds played: 282, Win percent: 53.8%, Pistol rounds: 26, Pistol rounds won: 14, Pistol round win percent: 53.8%, CT round win percent: 60.4%, T round win percent: 39.1%, Pick percent: 2.6%, Ban percent: 17.1%,    | Rounds won: 164, Times played: 13, Wins / draws / losses: 10 / 0 / 3, Total rounds played: 269, Win percent: 76.9%, Pistol rounds: 26, Pistol rounds won: 18, Pistol round win percent: 69.2%, CT round win percent: 59.8%, T round win percent: 61.8%, Pick percent: 81.2%, Ban percent: 0.0%,   |
| OG         | Rounds won: 809, Times played: 68, Wins / draws / losses: 43 / 0 / 25, Total rounds played: 1501, Win percent: 63.2%, Pistol rounds: 136, Pistol rounds won: 75, Pistol round win percent: 55.1%, CT round win percent: 53.1%, T round win percent: 54.6%, Pick percent: 66.2%, Ban percent: 4.6%, | Rounds won: 406, Times played: 35, Wins / draws / losses: 18 / 0 / 17, Total rounds played: 785, Win percent: 51.4%, Pistol rounds: 70, Pistol rounds won: 42, Pistol round win percent: 60.0%, CT round win percent: 46.0%, T round win percent: 56.9%, Pick percent: 9.9%, Ban percent: 16.1%, | Rounds won: 319, Times played: 29, Wins / draws / losses: 13 / 0 / 16, Total rounds played: 663, Win percent: 44.8%, Pistol rounds: 58, Pistol rounds won: 34, Pistol round win percent: 58.6%, CT round win percent: 51.2%, T round win percent: 45.0%, Pick percent: 14.5%, Ban percent: 18.6%, | Rounds won: 369, Times played: 36, Wins / draws / losses: 18 / 0 / 18, Total rounds played: 756, Win percent: 50.0%, Pistol rounds: 72, Pistol rounds won: 36, Pistol round win percent: 50.0%, CT round win percent: 50.0%, T round win percent: 47.5%, Pick percent: 15.5%, Ban percent: 10.9%, | Rounds won: 249, Times played: 21, Wins / draws / losses: 11 / 0 / 10, Total rounds played: 496, Win percent: 52.4%, Pistol rounds: 42, Pistol rounds won: 22, Pistol round win percent: 52.4%, CT round win percent: 51.9%, T round win percent: 48.3%, Pick percent: 12.2%, Ban percent: 49.6%, | Rounds won: 362, Times played: 31, Wins / draws / losses: 20 / 0 / 11, Total rounds played: 678, Win percent: 64.5%, Pistol rounds: 62, Pistol rounds won: 37, Pistol round win percent: 59.7%, CT round win percent: 57.7%, T round win percent: 48.8%, Pick percent: 10.7%, Ban percent: 14.5%, |

====================================

Here are some possibly relevant news articles to help you:

---

# Complexity add junior and adreN for Austin Major with hallzerk in doubt

Complexity will play the Austin Major with junior standing in for hallzerk due to visa issues, and adreN stepping in as coach. Junior, who has a strong 1.21 rating in 2025, reunites with former teammates Grim and JT, but the team faces challenges integrating him quickly. AdreN's coaching pedigree could help offset the disruption, especially for the team's Major rookies. Complexity's recent form includes a strong fourth-place at PGL Bucharest but a disappointing 9-12th at IEM Melbourne. Their success at the Major will depend on junior's adaptation, adreN's leadership, and the team's ability to fill the gap left by hallzerk.

---

---

# JT: "It's going to take time to get to that [playoff] level consistently"

Complexity was knocked out of IEM Melbourne by GamerLegion, struggling on their favored maps Train and Nuke, with captain JT citing lack of practice and travel fatigue as key issues. The team showed promise on Ancient, reflecting recent practice, but overall inconsistency—partly due to integrating new players and lacking a permanent coach—remains a challenge. JT emphasized the need for time and preparation to reach consistent playoff form, with a month-long bootcamp planned before the Major. The team will focus on reviewing matches, adding new strategies, and improving team cohesion. Complexity's success in upcoming matches will depend on their ability to address these preparation gaps, stabilize their roster, and adapt their playstyle, especially on key maps.

---

---

# GamerLegion stay alive at Complexity's expense

Complexity were knocked out of IEM Melbourne by GamerLegion, finishing 9-12th after a 2-1 series loss. Their only win came against a paiN team missing biguzera, and they failed to match their previous form from PGL Bucharest. Complexity struggled on their own map pick, Train, due to GamerLegion's strong T-side led by REZ, and while they dominated Ancient, they were outclassed on Nuke. Key weaknesses included inconsistent map performance and difficulty countering GamerLegion's top fraggers. Complexity's current form and map pool issues could be critical factors in future matches.

---

---

# The MongolZ scrape victory after near collapse to Complexity in Melbourne opener

Complexity narrowly lost 2-1 to The MongolZ in their IEM Melbourne opener, showing strong comeback potential on both Anubis and Ancient but falling short in the Inferno decider. Grim stood out with crucial plays, especially on Inferno, while the team capitalized on opponent mistakes, including a technical issue. However, slow starts and inconsistent pistol rounds hindered their chances, and late-game execution proved costly. Complexity's resilience is a key strength, but improving early-round performance and closing out maps will be vital for future success. Their ability to exploit opponent errors and deliver under pressure could be decisive in upcoming matches.

---

---

# Complexity secure home Major berth, Imperial qualify from South America

Complexity have qualified for the BLAST.tv Austin Major after a series of close but undefeated matches in the North America qualifier, demonstrating resilience but also exposing some weaknesses in closing out games. The team, led by JT and featuring new additions Cxzi and nicx, will play on home turf in Texas. Their recent fourth-place finish at PGL Bucharest and ability to recover from deficits are positives, but their narrow wins indicate a need for improved consistency and composure. Key to their success will be integrating new players and tightening up their late-game execution. Their current form suggests they are strong contenders, but must address these issues to avoid potential upsets at the Major.

---

---

# Complexity, M80 pull out of Fragadelphia Vegas\*

Complexity has pulled out of Fragadelphia Vegas due to scheduling conflicts with IEM Melbourne and hallzerk's inability to attend, prioritizing Melbourne after being invited following Spirit's withdrawal. The team would have needed a stand-in for Fragadelphia, which is risky with the BLAST.tv Austin Major coming up. Complexity's recent four wins from Bucharest have changed their competitive outlook, making high-value events like Melbourne more important. Hallzerk's recurring visa issues remain a concern for US-based events. Complexity's chances in upcoming matches hinge on maintaining their full roster, especially hallzerk, and building on their recent strong form.

---

---

# HEROIC, OG secure Austin Major Stage 1 berths

OG qualified for the BLAST.tv Austin Major Stage 1 with a 3-0 record in the Europe MRQ, highlighted by Chr1zN's standout 1.72 rating and strong performances from their Danish trio. This is OG's first Major appearance since the Paris Major, now with a new roster including Buzz, Chr1zN, and spooke, all debuting at this level. The team's recent upswing is linked to the addition of nicoodoz. OG's chances in upcoming matches hinge on maintaining their current form, especially from Chr1zN and the Danish core. Their ability to adapt as a new lineup will be crucial for deeper Major runs.

---

---

# Astralis to face OG in EU MRQ Round 1

OG will face Astralis in the opening round of the Europe Regional Qualifier for the Austin Major, following a recent boost in form and roster changes. OG's new Danish core, led by 18-year-old IGL Chr1zN and featuring recent signing nicoodoz, has shown promise after winning CCT Season 2 Europe Series 20. The match will be a best-of-one, increasing the importance of strong map selection and preparation. OG's chances hinge on the synergy of their new lineup and the ability of Chr1zN and nicoodoz to perform against Astralis. Success will depend on how quickly the team adapts and executes under the pressure of a Major-qualifying event.

---

---

# OG confirm nicoodoz addition

OG have permanently signed AWPer nicoodoz, who has delivered a 1.12 rating over 73 maps and helped the team win CCT Season 2 Europe Series 20 and place second at the PGL Bucharest Closed Qualifier. This move gives OG a Danish-majority roster and follows the benching of MoDo. Their improved results have boosted them to No. 27 in the Valve rankings, likely securing an invite to the Austin Major MRQ. The current roster is F1KU, spooke, Buzz, Chr1zN, and nicoodoz, coached by Lambert. OG's key to future wins will be sustaining nicoodoz's impact, capitalizing on Danish synergy, and maintaining their upward trajectory in qualifiers.

---

---

# OG surge to No. 23 on VRS after CCT S20 victory

OG surged to No. 23 in Valve's Global Ranking after winning CCT S20, powered by F1KU's outstanding 1.90-rated grand final and strong showings from stand-in nicoodoz and Chr1zN. The team has shown resilience, notably reverse-sweeping PARIVISION after heavy losses, and has beaten notable teams like fnatic, Nemiga, and 500. Despite lacking a full roster, OG's recent form and key player performances have put them in a favorable position for upcoming event invites. Their success hinges on continued strong performances from F1KU, nicoodoz, and Chr1zN, but their incomplete lineup could be a risk. Map strengths include Ancient and Inferno, while roster instability remains a potential weakness.

---

---

# Apogee complete underdog run to qualify for PGL Bucharest over OG

OG fell 3-1 to Betclic (Apogee) in the PGL Bucharest Europe closed qualifier final, missing out on a major event spot despite a strong run with stand-in AWPer nicoodoz, who posted a 1.19 rating over 18 maps. OG's strengths included strong T sides and early map leads, but they struggled to close out games, particularly on Nuke and Dust2, where missed AWP shots and lost momentum proved costly. The team showed improved form and resilience, but critical errors in high-pressure rounds led to their defeat. Key players like nicoodoz performed well overall, but OG's inability to convert advantages into wins remains a concern. Their recent performance suggests potential, but consistency and finishing maps will be crucial for future success.

---

---

# OG bench MoDo

OG have benched AWPer MoDo after ten months, citing inconsistent results and his modest 1.02 rating. During MoDo's tenure, OG's best finishes were second at Skyesports Masters and top-four at Thunderpick World Championship 2024, but they failed to qualify for most tier-one LANs. The current roster is F1KU, spooke, Buzz, Chr1zN, and coach Lambert, with the team now seeking a new AWPer. MoDo's departure leaves a gap in the sniper role, and OG's success in upcoming matches will depend on how well they fill this position and address their consistency issues. The team's ability to secure a high-impact AWPer and improve overall performance will be key to future wins.

---

---

# spooke joins OG

OG have signed spooke, a high-performing rifler from Johnny Speeds, to replace Nexius and complete their roster. Spooke's strong 1.16 rating and recent LAN success could boost OG's firepower and consistency. The team, currently ranked 73rd globally, urgently needs better results to earn invites to top events. OG passed on M1key in favor of spooke, indicating confidence in his abilities. The new lineup's synergy and spooke's adaptation will be key factors in their upcoming matches.

---

The team name you choose _MUST_ be one of the following:

- OG
- Complexity

Remember to explain step-by-step all of your thinking in great detail. Describe which maps have a likely chance to be played. Use bulleted lists to structure your output. Be decisive – do not hedge your decisions. The presented news articles may or may not be relevant, so assess them carefully.
