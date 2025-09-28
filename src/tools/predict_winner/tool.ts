import { llm } from '../../utils/llm';
import { PredictWinnerPrompt } from './prompt';
import { SCHEMA } from './schema';
import { Match } from '../../repos/matches';
import { ChampionshipRepo } from '../../repos/championship';
import * as fs from 'fs/promises';
import * as path from 'path';
import { CONFIG } from '../../config';

export const predictWinner = async (match: Match) => {
  const championship = await new ChampionshipRepo().load();

  const homeTeamStats = await match.home.stats(match);
  const awayTeamStats = await match.away.stats(match);

  const systemPrompt = PredictWinnerPrompt({
    home: homeTeamStats,
    away: awayTeamStats,
    match,
    championship,
  });

  const response = await llm(systemPrompt, SCHEMA);

  const matchesPath = path.join(__dirname, '../../../../', 'matches-cached/');
  await fs.mkdir(matchesPath, { recursive: true });
  const matchPath = path.join(matchesPath, `${match.home.name}-${match.away.name}.json`);
  await fs.writeFile(matchPath, JSON.stringify(response, null, 2));

  const championshipPath = path.join(__dirname, '../../../../', 'championship-cached/');
  await fs.mkdir(championshipPath, { recursive: true });

  const winnerPath = path.join(championshipPath, `${response.winningTeam}.json`);
  const loserPath = path.join(championshipPath, `${response.losingTeam}.json`);

  const winnerData = JSON.parse(await fs.readFile(winnerPath, 'utf-8'));
  winnerData.wins++;
  await fs.writeFile(winnerPath, JSON.stringify(winnerData, null, 2));

  const loserData = JSON.parse(await fs.readFile(loserPath, 'utf-8'));
  loserData.losses++;
  await fs.writeFile(loserPath, JSON.stringify(loserData, null, 2));

  return response;
};