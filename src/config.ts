import { config } from 'dotenv'

// Load dotenv config
config()

function throwRequiredEnvVar(name: string): never {
	throw new Error(`${name} is required.`)
}

export const CONFIG = {
	OPENAI_API_KEY: process.env.OPENAI_API_KEY || throwRequiredEnvVar('OPENAI_API_KEY'),
	BASE_URL: process.env.BASE_URL || throwRequiredEnvVar('BASE_URL'),
	MODEL: process.env.MODEL || throwRequiredEnvVar('MODEL'),
	HEADLESS: process.env.HEADLESS === 'true',
	VERBOSE: true,
}

// Fail loudly if the OPENAI_API_KEY is still the default value
if (CONFIG.OPENAI_API_KEY === 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') {
	throw new Error('Please set the OPENAI_API_KEY in your .env file to a non-default value.')
}
