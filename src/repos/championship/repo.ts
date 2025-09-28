import * as fs from 'fs/promises';
import * as path from 'path';
import { Championship, Standing } from './entity';
import { TeamRepo } from '../teams';
import { Stage } from '../../tools/predict_winner/prompt';

export class ChampionshipRepo {
  private getPath(stage: Stage) {
    return path.join(__dirname, `../../../../championship-cached/${stage}.json`);
  }

  public async load(stage: Stage = 'stage1'): Promise<Championship> {
    try {
      const data = await fs.readFile(this.getPath(stage), 'utf-8');
      const parsed = JSON.parse(data);
      const standings = parsed.standings.map((s: any) => ({
        team: new TeamRepo().find(s.team),
        wins: s.wins,
        losses: s.losses,
      }));
      return new Championship(stage, standings);
    } catch {
      return new Championship(stage, []);
    }
  }

  public async update(winner: { winningTeam: string; losingTeam: string }, stage: Stage = 'stage1') {
    const championship = await this.load(stage);
    const winnerStanding = championship.standings.find(s => s.team.name === winner.winningTeam);
    if (winnerStanding) {
      winnerStanding.wins++;
    } else {
      championship.standings.push({ team: new TeamRepo().find(winner.winningTeam), wins: 1, losses: 0 });
    }

    const loserStanding = championship.standings.find(s => s.team.name === winner.losingTeam);
    if (loserStanding) {
      loserStanding.losses++;
    } else {
      championship.standings.push({ team: new TeamRepo().find(winner.losingTeam), wins: 0, losses: 1 });
    }
    await fs.writeFile(this.getPath(stage), JSON.stringify(championship, null, 2));
  }
}