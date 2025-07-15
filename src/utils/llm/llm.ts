import OpenAI from 'openai'
import { JSONSchema } from 'json-schema-to-ts'
import { SCHEMA } from './schema'
import { verboseLog } from '../../utils'
import { CONFIG } from '../../config'

const API_KEY = CONFIG.MODEL_API_KEY
const BASE_URL = CONFIG.BASE_URL
const MODEL = CONFIG.MODEL
const IS_REASONING_MODEL = CONFIG.IS_REASONING_MODEL

const openai = new OpenAI({
	apiKey: API_KEY,
	baseURL: BASE_URL,
})

/**
 * Wraps calls to the LLM that will call a well-typed tool and return
 * a well-typed response.
 *
 */
export async function llm<T>(
	systemPrompt: string,
	userPrompt: any,
	toolSchema: { schema: JSONSchema; type: T }
): Promise<T> {
	// TODO: There is a lot going on this function. We should break it up / clean it up.
	const schema = SCHEMA(toolSchema.schema)

	// Compatibility issues with OpenAI API
	// Most of the LLM models claim they have "OpenAI API Comaptibility" but some or most
	// of the params might not work for them. So we need to peform some checking here
	// Also the IS_REASONING_MODEL var from env helps to determine the right API call.
	const isReallyOpenAI = MODEL?.toLowerCase().includes('gpt')
	const systemPromptWithSchema = `
		${systemPrompt}
		You must respond directly ONLY with a JSON object that is valid and matching this schema:
		${JSON.stringify(schema)}

		DO NOT use markdown syntax or any other formatting.
	`

	verboseLog('=============================================')
	verboseLog('Starting request to LLM:')
	verboseLog('\nSYSTEM:\n', isReallyOpenAI ? systemPrompt : systemPromptWithSchema)
	verboseLog('\nUSER:\n', JSON.stringify(userPrompt))

	// We wrap the provided schema in a parent schema that forces
	// the LLM to think and perform analysis before generating tool
	// parameters. If we don't do this, and you ask the LLM to, for
	// example, generate a boolean – it will just generate a boolean
	// without putting a lot of thought into that boolean. Even if
	// your prompt uses Chain-of-Thought or similar techniques.
	//
	// By forcing the first parameter the LLM generates to be
	// that analysis, we can ensure that the LLM will not just jump
	// right into generating the tool parameters, but will also
	// write down thoughts in a scratchpad (of sorts) about it first.
	try {
		const schema = SCHEMA(toolSchema.schema) as any
		const response = await openai.chat.completions.create({
			messages: [
				{
					role: 'system',
					content: systemPrompt,
				},
				{
					role: 'user',
					content: JSON.stringify(userPrompt),
				},
			],
			model: MODEL!,
			temperature: IS_REASONING_MODEL ? 1 : 0.1,
			max_completion_tokens: 4000,
			tool_choice: isReallyOpenAI ? { type: 'function', function: { name: 'response' } } : undefined,
			tools: isReallyOpenAI
				? [
						{
							type: 'function',
							function: {
								name: 'response',
								description: "The JSON response to the user's inquiry.",
								parameters: schema,
							},
						},
				  ]
				: undefined,
		})

		// TODO: Do better validation on the response.
		const content = response.choices[0]?.message?.tool_calls![0]?.function.arguments

		if (content == null) {
			throw new Error('LLM did not return arguments to parse')
		}

		const contentObj = JSON.parse(content)

		verboseLog('\nRESPONSE:\n')
		verboseLog(JSON.stringify(contentObj, null, 2))
		verboseLog('=============================================')

		let conclusion = contentObj.conclusion
		// Edge case: LLM sometimes might not provide the conclusion required and it will return
		// an string instead of a object requested in the schema.
		if (typeof conclusion === 'string') {
			console.warn('LLM did not return the requested schema', conclusion)
			return { summary: conclusion, analysis: contentObj.analysis } as T
		}

		return { ...contentObj.conclusion, analysis: contentObj.analysis } as T
	} catch (error) {
		console.error('LLM error', error)
		throw error
	}
}
