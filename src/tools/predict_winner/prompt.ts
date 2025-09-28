import { Match } from '../../repos/matches';
import { TeamStats } from '../../repos/stats';
import { Championship } from '../../repos/championship';

export type Stage = 'stage1' | 'stage2' | 'stage3' | 'playoffs';

type SystemPromptArgs = {
  home: TeamStats;
  away: TeamStats;
  match: Match;
  championship: Championship;
};

export const PredictWinnerPrompt = ({ home, away, match, championship }: SystemPromptArgs) => `
You are an expert in Counter-Strike 2 pro matches.
Your goal is to predict the winner of a match based on the provided stats.

Analyze the provided data for both teams and predict the winner of the match.
You MUST provide a winner and a loser.

Today is ${new Date().toDateString()}.

The match is a best of ${match.bestOf}.

The current stage of the championship is ${championship.stage}.
The current standings are:
${championship.standings.map(s => `${s.team.name}: ${s.wins}W-${s.losses}L`).join('\n')}

Home Team: ${home.team.name}
${Object.entries(home.teamstats).map(([key, value]) => `${key}: ${value}`).join('\n')}

Away Team: ${away.team.name}
${Object.entries(away.teamstats).map(([key, value]) => `${key}: ${value}`).join('\n')}
`;