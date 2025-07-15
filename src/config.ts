import { config } from 'dotenv'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

// Load dotenv config
config()

const argv = yargs(hideBin(process.argv))
	.option('headless', {
		type: 'boolean',
		description: 'Run in headless mode',
		default: false,
	})
	.option('verbose', {
		type: 'boolean',
		description: 'Enable verbose logging',
		default: true,
	})
	.option('cache', {
		type: 'boolean',
		description: 'Enable caching of stats and articles',
		default: true,
	})
	.option('look-for-new-articles', {
		type: 'boolean',
		description: 'Whether to fetch the list of articles from a team',
		default: false,
	})
	.option('home', {
		type: 'string',
		description: 'Home team name (higher seed, picks first in picks/bans and chooses the side of first map)',
		requiresArg: true,
		demandOption: false,
	})
	.option('away', {
		type: 'string',
		description: 'Away team name (lower seed, picks second in picks/bans)',
		requiresArg: true,
		demandOption: false,
	})
	.option('bestof', {
		type: 'string',
		choices: ['1', '3', '5'],
		description: 'Best of X games',
		requiresArg: true,
		demandOption: false,
	})
	.option('major', {
		type: 'boolean',
		requiresArg: false,
		demandOption: false,
		description: 'Whether the match is in the Major Championship context',
		default: true,
	})
	.option('stage', {
		type: 'string',
		choices: ['stage1', 'stage2', 'stage3', 'playoffs'],
		requiresArg: true,
		demandOption: false,
		description: 'The stage of the match, if major option is true',
		default: 'stage1',
	})
	.parseSync()

function throwRequiredEnvVar(name: string): never {
	throw new Error(`${name} is required.`)
}

export const CONFIG = {
	MODEL_API_KEY: process.env.MODEL_API_KEY || throwRequiredEnvVar('MODEL_API_KEY'),
	BASE_URL: process.env.BASE_URL || throwRequiredEnvVar('BASE_URL'),
	MODEL: process.env.MODEL || throwRequiredEnvVar('MODEL'),
	HEADLESS: argv.headless,
	VERBOSE: argv.verbose,
	CACHE: argv.cache,
	LOOK_FOR_NEW_ARTICLES: argv.lookForNewArticles,
	MATCH: {
		HOME: argv.home,
		AWAY: argv.away,
		BESTOF: argv.bestof as '1' | '3' | '5' | undefined,
		MAJOR: argv.major,
		STAGE: argv.stage as 'stage1' | 'stage2' | 'stage3' | 'playoffs',
	},
}
