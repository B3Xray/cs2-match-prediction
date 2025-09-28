import { z } from 'zod';

export const SCHEMA = z.object({
  summary: z.string().describe('The summary of the article.'),
  keyElements: z.array(z.string()).describe('key elements that can make the team win - member trades, stats and results.'),
});