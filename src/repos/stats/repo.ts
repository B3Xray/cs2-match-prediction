import { CONFIG } from '../../config'
import { fileExists, navigateTo, verboseLog } from '../../utils'
import { TeamStats, TeamStatType as StatType, TeamStatType } from './entity'
import { MatchHistory } from './gameHistory'

import * as fs from 'fs/promises'
import * as path from 'path'

const WAIT_FOR = '.contentCol'

const BASE_URL_SEARCH = 'https://www.hltv.org/search'
const BASE_URL = 'https://www.hltv.org'
const SELECTOR_SEARCH = 'td a[href^="/team"]'

const saveStat = async (stat: TeamStats) => {
	if (!CONFIG.CACHE) return

	const statPath = path.join(__filename, '../../../../', 'stats-cached/')
	const filename = `${stat.team}-${stat.type}.json`
	const filePath = path.join(statPath, filename)

	await fs.mkdir(statPath, { recursive: true })
	await fs.writeFile(filePath, JSON.stringify(stat), 'utf-8')
}

const getCachedStat = async (team: string, type: StatType): Promise<TeamStats | undefined> => {
	const statPath = path.join(__filename, '../../../../', 'stats-cached/')
	const filename = `${team}-${type}.json`
	const filePath = path.join(statPath, filename)

	const exists = await fileExists(filePath)

	if (!exists) return

	const file = await fs.readFile(filePath, 'utf-8')
	verboseLog('returning cached stat for', team, type)
	const parsed = JSON.parse(file) as TeamStats
	return new TeamStats(parsed.team, parsed.type, parsed.stats)
}

/**
 * A repository for retrieving historical stats for each team across
 * KDA ratio and win rate.
 */
export class TeamStatsRepo {
	private async getTeamStatsPage(team: string): Promise<string | null> {
		const locator = await navigateTo(`${BASE_URL_SEARCH}?query=${team}`, WAIT_FOR)
		const headlines = await locator.locator(SELECTOR_SEARCH).all()
		const teamLinks = await Promise.all(
			headlines.map(async headline => ({
				href: await headline.getAttribute('href'),
				name: await headline.innerText(),
			}))
		)
		const matchingTeam = teamLinks.find(t => t.name.toLowerCase() === team.toLowerCase())
		if (!matchingTeam?.href) return null

		const statPage = `https://www.hltv.org/stats/teams${matchingTeam.href.replace(
			'/team',
			''
			// TODO: add date-fns, now to 6 months ago
		)}?startDate=2024-06-18&endDate=2025-06-18`

		return statPage
	}

	private async getTeamPage(team: string): Promise<string | null> {
		const locator = await navigateTo(`${BASE_URL_SEARCH}?query=${team}`, WAIT_FOR)
		const headlines = await locator.locator(SELECTOR_SEARCH).all()
		const teamLinks = await Promise.all(
			headlines.map(async headline => ({
				href: await headline.getAttribute('href'),
				name: await headline.innerText(),
			}))
		)
		const matchingTeam = teamLinks.find(t => t.name.toLowerCase() === team.toLowerCase())
		if (!matchingTeam?.href) return null

		return matchingTeam.href
	}

	/**
	 * Scrapes a specific type of stats for all teams.
	 *
	 * @param type The type of stats to scrape. (e.g. offense, defense, etc.)
	 * @returns {Promise<TeamStats[]>} The stats of the given type for all teams.
	 */
	private async fetchTypeByTeam(team: string, type: StatType): Promise<TeamStats | null> {
		if (type === TeamStatType.TEAM_STATS) {
			const statsPage = await this.getTeamStatsPage(team)

			if (!statsPage) {
				throw new Error(`No stats page found for ${team} and ${type}`)
			}

			const page = await navigateTo(statsPage, WAIT_FOR)

			let teamStat: TeamStats | null = null

			const wdl = page.locator('.columns .standard-box .large-strong').nth(1)
			const wdlString = await wdl.textContent()
			const kdRatio = page.locator('.columns .standard-box .large-strong').nth(5)
			const kdRatioString = await kdRatio.textContent()

			if (wdlString && kdRatioString) {
				const values = wdlString.split(' / ').map(s => parseInt(s))

				if (values.length === 3 && values.every(v => !isNaN(v))) {
					const [wins, draws, losses] = values
					const total = wins! + draws! + losses!
					teamStat = new TeamStats(team, type, {
						'Win rate': `${(wins! / total) * 100}%`,
						'Kill death ratio': kdRatioString,
					})
					saveStat(teamStat)
				}
			}

			return teamStat
		}

		if (type === TeamStatType.WORLD_RANKING) {
			const teamPage = await this.getTeamPage(team)
			const page = await navigateTo(`https://www.hltv.org${teamPage}`, WAIT_FOR)
			const worldRanking = await page
				.locator('.profile-team-stat-50-50 .profile-team-stat')
				.first()
				.locator('.right')
				.textContent()
			if (typeof worldRanking === 'string') {
				const teamStat = new TeamStats(team, type, {
					'World Ranking': worldRanking,
				})
				saveStat(teamStat)
				return teamStat
			}
		}

		if (type === TeamStatType.EVENT_HISTORY) {
			const statsPage = await this.getTeamStatsPage(team)
			if (!statsPage) {
				throw new Error(`No stats page found for ${team} and ${type}`)
			}
			const eventsPage = statsPage.replace('/teams/', '/teams/events/')
			const page = await navigateTo(eventsPage, WAIT_FOR)

			// header + first 10 rows of the table
			const tableRows = await page.locator('table.stats-table tbody tr').all()

			const eventHistoryObj: Record<string, string> = {}

			for await (const tr of tableRows) {
				const row = await tr.locator('td').all()
				if (row.length === 0) continue

				const pos = await row[0]?.textContent()
				const eventName = await row[1]?.textContent()

				if (typeof pos === 'string' && typeof eventName === 'string' && pos !== '-') {
					eventHistoryObj[eventName] = pos
				}
			}

			const teamStat = new TeamStats(team, type, eventHistoryObj)
			saveStat(teamStat)

			return teamStat
		}

		if (type === TeamStatType.MAP_POOL) {
			const statsPage = await this.getTeamStatsPage(team)
			if (!statsPage) {
				throw new Error(`No stats page found for ${team} and ${type}`)
			}
			const mapsPage = statsPage.replace('/teams/', '/teams/maps/')
			const page = await navigateTo(mapsPage, WAIT_FOR)

			const ACTIVE_MAPS = ['Ancient', 'Anubis', 'Dust2', 'Inferno', 'Mirage', 'Nuke', 'Train']
			let mapsObject: Record<string, string> = {}

			const mapTabs = await page.locator('.stats-top-menu a.stats-top-menu-item').all()
			for (const tab of mapTabs) {
				const mapName = await tab.textContent()
				if (ACTIVE_MAPS.includes(mapName!)) {
					const href = await tab.getAttribute('href')
					const mapStatsPage = await navigateTo(`${BASE_URL}${href}`, WAIT_FOR)

					let mapString = ''
					const statRows = await mapStatsPage.locator('.stats-rows .stats-row').all()
					for (const row of statRows) {
						const title = await row.locator('span').first()?.textContent()
						const value = await row.locator('span').last()?.textContent()
						if (typeof title === 'string' && typeof value === 'string') {
							mapString += `${title}: ${value}, `
						}
					}
					mapsObject[mapName!] = mapString
				}
			}

			const teamStat = new TeamStats(team, type, mapsObject)
			saveStat(teamStat)

			return teamStat
		}

		return null
	}

	/**
	 * Retrieve stats for the given team and stat type.
	 *
	 * @param team The team to retrieve stats for.
	 * @param type The type of stats to retrieve.
	 * @returns {Promise<TeamStats>} The stats for the given team and type.
	 */
	public async findByTeamAndType(team: string, type: StatType): Promise<TeamStats | null> {
		// check if there's already stats for this team
		const cachedTeamStat = await getCachedStat(team, type)
		if (cachedTeamStat) {
			return cachedTeamStat
		}

		const stats = await this.fetchTypeByTeam(team, type)
		return stats
	}

	private async getTeamId(team: string): Promise<string> {
		const locator = await navigateTo(`${BASE_URL_SEARCH}?query=${team}`, WAIT_FOR)
		const headlines = await locator.locator(SELECTOR_SEARCH).all()
		const hrefs = await Promise.all(headlines.map(async headline => headline.getAttribute('href')))
		if (!hrefs[0]) {
			throw new Error(`cant find a href in ${hrefs[0]}`)
		}
		// /team/:id/:name
		const [_, _team, id, _name] = hrefs[0].split('/')
		if (!id) {
			throw new Error(`cant find a id in ${hrefs[0]}`)
		}
		return id
	}

	private async getTeamsMatchHistory(team0Id: string, team1Id: string): Promise<MatchHistory[]> {
		const BASE_URL_RESULTS = 'https://www.hltv.org/results'
		const url = new URL(BASE_URL_RESULTS)
		// TODO: add date-fns, now to 6 months ago
		url.searchParams.append('startDate', '2024-06-18')
		url.searchParams.append('endDate', '2025-06-18')
		url.searchParams.append('requireAllTeams', '')
		url.searchParams.append('team', team0Id)
		url.searchParams.append('team', team1Id)

		const page = await navigateTo(url.toString(), WAIT_FOR)
		const tableRows = await page.locator('.results-all table tbody tr').all()

		let MatchHistoryArray: Array<MatchHistory> = []

		for await (const tr of tableRows) {
			const higherSeedTeam = await tr.locator('.team1 .team').textContent()
			const lowerSeedTeam = await tr.locator('.team2 .team').textContent()
			const winner = await tr.locator('.team-won').textContent()
			const event = await tr.locator('.event .event-name').textContent()

			if (
				typeof higherSeedTeam === 'string' &&
				typeof lowerSeedTeam === 'string' &&
				typeof winner === 'string' &&
				typeof event === 'string'
			) {
				MatchHistoryArray.push({
					'Higher seed team': higherSeedTeam,
					'Lower seed team': lowerSeedTeam,
					'Winner of the match': winner,
					Event: event,
				})
			}
		}

		return MatchHistoryArray
	}

	public async findMatchHistory(teams: string[]): Promise<MatchHistory[]> {
		verboseLog('finding match history for', teams)
		// check if there's already match history for both teams here

		const team0id = await this.getTeamId(teams[0]!)
		const team1id = await this.getTeamId(teams[1]!)

		return this.getTeamsMatchHistory(team0id, team1id)
	}
}
