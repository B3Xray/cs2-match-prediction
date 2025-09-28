import { Team, TeamRepo } from '../teams';
import { Article, ArticleRepo } from '../articles';
import { TeamStats, TeamStatsRepo } from '../stats';

export type BestOf = '1' | '3' | '5';

export class Match {
  home: Team;
  away: Team;
  bestOf: BestOf;

  constructor(home: string, away: string, bestOf: BestOf) {
    this.home = new TeamRepo().find(home);
    this.away = new TeamRepo().find(away);
    this.bestOf = bestOf;
  }

  get teams(): Team[] {
    return [this.home, this.away];
  }

  public async articles(): Promise<Article[]> {
    return new ArticleRepo().findByTeams(this.teams);
  }
}