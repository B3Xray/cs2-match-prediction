import { Team } from '../teams';
import { GameHistory } from './gameHistory';

export type TeamStatType = 'Team Stats' | 'Event History' | 'Match History' | 'Map Pool' | 'World ranking';

export type TeamStats = {
  team: Team;
  teamstats: { [key: string]: string };
  eventhistory: GameHistory[];
  matchhistory: GameHistory[];
  mappool: { [key: string]: string };
  worldranking: string;
};