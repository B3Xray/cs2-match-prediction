import { CONFIG } from '../../config'
import { Match } from './entity'

/**
 * A repository for retrieving and mutating Matches for the current week.
 */
export class MatchRepo {
	private static matches: Match[] | null = null

	/**
	 * Get the list of matches.
	 *
	 * This returns one entry for each game that will be played, each containing
	 * the two teams that will play.
	 *
	 * @returns {Promise<Match[]>} The list of matches.
	 */
	public async list(): Promise<Match[]> {
		if (MatchRepo.matches == null) {
			// Only use CLI arguments if ALL match parameters are provided
			if (CONFIG.MATCH.HOME && CONFIG.MATCH.AWAY && CONFIG.MATCH.BESTOF) {
				MatchRepo.matches = [new Match(CONFIG.MATCH.HOME, CONFIG.MATCH.AWAY, CONFIG.MATCH.BESTOF)]
			} else {
				MatchRepo.matches = [
					// Manually add matches here if the CLI arguments are not provided, example:
					// new Match('FaZe', 'Spirit', '3')
				]
			}
		}
		return MatchRepo.matches
	}
}
