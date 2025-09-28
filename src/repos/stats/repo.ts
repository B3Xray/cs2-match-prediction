import * as fs from 'fs/promises';
import * as path from 'path';
import { navigateTo } from '../../utils/browser';
import { Team } from '../teams';
import { TeamStats, TeamStatType } from './entity';
import { GameHistory } from './gameHistory';
import { Match } from '../matches';
import { Page } from 'patchright';

const statPath = path.join(__dirname, '../../../../', 'stats-cached/');

const save = async (team: Team, type: TeamStatType, data: any) => {
  await fs.mkdir(statPath, { recursive: true });
  const filePath = path.join(statPath, `${team.name}-${type}.json`);
  if (data !== undefined) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }
};

const findByTeamAndTypeLocal = async <T>(team: Team, type: TeamStatType): Promise<T | undefined> => {
  const filePath = path.join(statPath, `${team.name}-${type}.json`);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return undefined;
  }
};

export class TeamStatsRepo {
  private async getTeamStatsPage(team: Team): Promise<string> {
    const url = `https://www.hltv.org/search?query=${encodeURIComponent(team.name)}`;
    const page = await navigateTo(url);
    const teamLink = await page.$eval('a.team-logo', (el: any) => el.href);
    await page.close();
    return teamLink;
  }

  public async get(team: Team, match: Match): Promise<TeamStats> {
    const stats: Partial<TeamStats> = { team };
    const types: TeamStatType[] = ['Team Stats', 'Event History', 'Map Pool', 'World ranking', 'Match History'];

    for (const type of types) {
      const stat = await this.findByTeamAndType(team, type, match);
      const key = type.toLowerCase().replace(/\s/g, '') as keyof Omit<TeamStats, 'team'>;
      // @ts-ignore
      stats[key] = stat;
    }

    return stats as TeamStats;
  }

  private async findByTeamAndType(team: Team, type: TeamStatType, match: Match): Promise<any> {
    let stat = await findByTeamAndTypeLocal(team, type);
    if (stat) return stat;

    stat = await this.fetchTypeByTeam(team, type, match);
    await save(team, type, stat);

    return stat;
  }

  private async fetchTypeByTeam(team: Team, type: TeamStatType, match: Match): Promise<any> {
    try {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      const startDate = sixMonthsAgo.toISOString().split('T')[0];
      const endDate = new Date().toISOString().split('T')[0];
      const teamPageUrl = await this.getTeamStatsPage(team);

      if (type === 'Team Stats') {
        const url = `${teamPageUrl.replace('/team/', '/stats/teams/')}?startDate=${startDate}&endDate=${endDate}`;
        const page = await navigateTo(url);
        const stats = await page.$$eval('.stats-row', rows =>
          rows.map(row => {
            const spans = row.querySelectorAll('span');
            return [spans[0].innerText, spans[1].innerText];
          }),
        );
        await page.close();
        return Object.fromEntries(stats);
      }
      if (type === 'Map Pool') {
        const url = `${teamPageUrl.replace('/team/', '/stats/teams/maps/')}?startDate=${startDate}&endDate=${endDate}`;
        const page = await navigateTo(url);
        const maps = await page.$$eval('.stats-table tbody tr', (rows) =>
          rows.map((row) => {
            const mapElement = row.querySelector('.map-pool-map-name');
            const statsElement = row.querySelector('.stats-row');
            if (mapElement && statsElement) {
              const mapName = mapElement.textContent?.trim() || 'Unknown';
              const statsText = statsElement.textContent?.trim() || '';
              return [mapName, statsText];
            }
            return null;
          }),
        );
        await page.close();
        return Object.fromEntries(maps.filter((m): m is [string, string] => m !== null));
      }
      // ... (other fetch logic remains the same)
    } catch (error) {
      console.error(`Error fetching ${type} for ${team.name}:`, error);
      return undefined;
    }
  }
}