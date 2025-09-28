import { Article, ArticleRepo } from '../../repos/articles';
import { llm } from '../../utils/llm';
import { AnalystPrompt } from './prompt';
import { SCHEMA } from './schema';
import { Team } from '../../repos/teams';
import { z } from 'zod';

export type Analysis = z.infer<typeof SCHEMA>;

export const analyze = async (article: Article, team: Team): Promise<Analysis> => {
  const prompt = AnalystPrompt(article.toString(), team.name);
  const response = await llm(prompt, SCHEMA);
  return response;
};