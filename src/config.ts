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
	.parseSync()

function throwRequiredEnvVar(name: string): never {
	throw new Error(`${name} is required.`)
}

export const CONFIG = {
	OPENAI_API_KEY: process.env.OPENAI_API_KEY || throwRequiredEnvVar('OPENAI_API_KEY'),
	BASE_URL: process.env.BASE_URL || throwRequiredEnvVar('BASE_URL'),
	MODEL: process.env.MODEL || throwRequiredEnvVar('MODEL'),
	HEADLESS: argv.headless,
	VERBOSE: argv.verbose,
	CACHE: argv.cache,
	LOOK_FOR_NEW_ARTICLES: argv.lookForNewArticles,
}

console.log(CONFIG)
// Fail loudly if the OPENAI_API_KEY is still the default value
if (CONFIG.OPENAI_API_KEY === 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') {
	throw new Error('Please set the OPENAI_API_KEY in your .env file to a non-default value.')
}
