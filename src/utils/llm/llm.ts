import { OpenAI } from 'openai';
import { z } from 'zod';
import { CONFIG } from '../../config';
import { withAnalysis } from './schema';
import { verboseLog } from '../log';
import { zodToJsonSchema } from 'zod-to-json-schema';

const openai = new OpenAI({
  apiKey: CONFIG.MODEL_API_KEY,
  baseURL: CONFIG.BASE_URL,
});

export const llm = async <T extends z.ZodObject<any, any, any>>(
  prompt: string,
  schema: T,
  retries = 3,
  timeout = 120_000,
): Promise<z.infer<T>> => {
  const S = withAnalysis(schema);
  const fnName = 'extract';

  for (let i = 0; i < retries; i++) {
    try {
      if (CONFIG.MODEL_PROVIDER === 'google') {
        const url = `${CONFIG.BASE_URL}/models/${CONFIG.MODEL}:generateContent?key=${CONFIG.MODEL_API_KEY}`;
        const jsonSchema = zodToJsonSchema(S);

        const body = {
          contents: [{ parts: [{ text: prompt }] }],
          tools: [
            {
              functionDeclarations: [
                {
                  name: fnName,
                  description: 'Extracts the relevant information from the text.',
                  parameters: jsonSchema,
                },
              ],
            },
          ],
          toolConfig: {
            functionCallingConfig: {
              mode: 'ANY',
              allowedFunctionNames: [fnName],
            },
          },
        };

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(timeout),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Gemini API error: ${response.status} ${errorText}`);
        }

        const data: any = await response.json();

        if (!data.candidates || !data.candidates[0].content.parts[0].functionCall) {
          throw new Error('Invalid response structure from Gemini API');
        }

        const functionCall = data.candidates[0].content.parts[0].functionCall;
        if (functionCall.name === fnName) {
          const parsed = S.parse(functionCall.args);
          return parsed.conclusion as z.infer<T>;
        } else {
          throw new Error('Unexpected function call response from Gemini API');
        }
      } else {
        const completion = await openai.chat.completions.create(
          {
            model: CONFIG.MODEL,
            messages: [{ role: 'user', content: prompt }],
            tools: [
              {
                type: 'function',
                function: { name: fnName, parameters: zodToJsonSchema(S) as any },
              },
            ],
            tool_choice: {
              type: 'function',
              function: { name: fnName },
            },
            temperature: 0.2,
          },
          { timeout },
        );

        const data = completion.choices[0].message!.tool_calls![0].function.arguments;
        verboseLog(`LLM completion:\n${data}`);
        const parsed = S.parse(JSON.parse(data));
        return parsed.conclusion as z.infer<T>;
      }
    } catch (e) {
      verboseLog(`LLM error: ${e}`);
      if (i === retries - 1) throw e;
    }
  }

  throw new Error('LLM call failed after multiple retries');
};