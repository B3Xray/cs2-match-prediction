import { Table } from '../../utils/tables';

export type GameHistory = {
  date: string;
  event: string;
  bestOf: number;
  team1: { name: string; score: number };
  team2: { name: string; score: number };
};

export const toTable = (history: GameHistory[]): Table => {
  const headers = ['Date', 'Event', 'Best Of', 'Team 1', 'Score', 'Team 2', 'Score'];
  const body = history.map(h => [
    h.date,
    h.event,
    h.bestOf.toString(),
    h.team1.name,
    h.team1.score.toString(),
    h.team2.name,
    h.team2.score.toString(),
  ]);
  return { headers, body };
};