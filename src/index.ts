import { MatchRepo } from './repos/matches';
import { predictWinner } from './tools';
import { ChampionshipRepo } from './repos/championship';

(async () => {
  let match;
  while ((match = await MatchRepo.findNext())) {
    const winner = await predictWinner(match);
    await new ChampionshipRepo().update(winner);
    console.log(`Prediction for ${match.home.name} vs ${match.away.name}: Winner is ${winner.winningTeam}`);
  }
})().catch(e => {
  console.error(e);
  process.exit(1);
});