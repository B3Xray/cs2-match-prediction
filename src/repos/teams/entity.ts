import { TeamStatsRepo, TeamStats } from '../stats';
import { Article, ArticleRepo } from '../articles';
import { Match } from '../matches';

export class Team {
  constructor(public readonly name: string) {}

  public async articles(): Promise<Article[]> {
    return new ArticleRepo().findByTeams([this]);
  }

  public async stats(match: Match): Promise<TeamStats> {
    const repo = new TeamStatsRepo();
    return repo.get(this, match);
  }
}