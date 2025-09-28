import { z } from 'zod';

export const withAnalysis = <T extends z.ZodObject<any, any, any>>(schema: T) => {
  return z.object({
    analysis: z.string().describe('Analysis done by LLM'),
    conclusion: schema,
  });
};