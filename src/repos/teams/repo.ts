import { Team } from './entity';

export class TeamRepo {
  private static teams: Team[] = [];

  public find(name: string): Team {
    let team = TeamRepo.teams.find(t => t.name === name);
    if (team) {
      return team;
    }
    team = new Team(name);
    TeamRepo.teams.push(team);
    return team;
  }
}