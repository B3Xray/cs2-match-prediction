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
			MatchRepo.matches = [
				// new Match('Complexity', 'OG', '1'),
				// new Match('HEROIC', 'Chinggis Warriors', '1'),
				// new Match('B8', 'Imperial', '1'),
				// new Match('BetBoom', 'Nemiga', '1'),
				// new Match('TYLOO', 'NRG', '1'),
				// new Match('Lynn Vision', 'Legacy', '1'),
				// new Match('Wildcard', 'Metizport', '1'),
				// new Match('FlyQuest', 'Fluxo', '1'),

				new Match('FAZE', 'MIBR', 'FAZE'),
				new Match('B8', 'Lynn Vision', 'Lynn Vision'),
				new Match('Nemiga', 'HEROIC', 'Nemiga'),

				// new Match('Falcons', 'FAZE', '1'),
				// new Match('3DMAX', 'Virtus.pro', '1'),
				// new Match('FURIA', 'MIBR', '1'),
				// new Match('paiN', 'M80', '1'),
				// new Match('Aurora', 'G2', '1'),
				// new Match('Natus Vincere', 'Liquid', '1'),
				// new Match('Vitality', 'MOUZ', '1'),
				// new Match('Spirit', 'The MongolZ', '1'),
			]
		}
		return MatchRepo.matches
	}
}
