import { z } from 'zod';

export const SCHEMA = z.object({
  winningTeam: z.string().describe('The name of the winning team.'),
  losingTeam: z.string().describe('The name of the losing team.'),
  mapPrediction: z.string().describe('The predicted map scores, e.g., 2-1.'),
});