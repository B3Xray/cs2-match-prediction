import { CONFIG } from '../../config'
import { Match, BestOf } from './entity'

export class MatchRepo {
  private static matches: Match[] = []

  public static async findNext(): Promise<Match | undefined> {
    if (this.matches.length === 0) {
      if (CONFIG.MATCH.HOME && CONFIG.MATCH.AWAY) {
        MatchRepo.matches = [
          new Match(CONFIG.MATCH.HOME, CONFIG.MATCH.AWAY, CONFIG.MATCH.BESTOF as BestOf),
        ]
      } else {
        // ... (rest of the file remains the same)
      }
    }
    return this.matches.shift()
  }
}