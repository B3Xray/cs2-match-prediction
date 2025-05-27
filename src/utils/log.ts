import { CONFIG } from '../config'
const { VERBOSE } = CONFIG

/**
 * Logs a message to the console if VERBOSE is true.
 *
 * @param message The message to log.
 * @param optionalParams Any optional parameters to log.
 */
export const verboseLog = (message?: any, ...optionalParams: any[]) => {
	if (VERBOSE) console.log(message, ...optionalParams)
}
