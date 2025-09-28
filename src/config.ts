import 'dotenv/config';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const getRequiredEnvVar = (name: string) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required.`);
  }
  return value;
};

const argv = yargs(hideBin(process.argv))
  .option('home', {
    type: 'string',
    description: 'Home team',
  })
  .option('away', {
    type: 'string',
    description: 'Away team',
  })
  .option('major', {
    type: 'boolean',
    description: 'Is major',
    default: true,
  })
  .option('stage', {
    type: 'string',
    description: 'The stage of the major',
    default: 'stage1',
  })
  .option('bestof', {
    type: 'string',
    description: 'Best of',
    default: '1',
  })
  .help()
  .parseSync();

if (argv.bestof !== '1' && argv.bestof !== '3' && argv.bestof !== '5') {
  throw new Error('Best of must be 1, 3 or 5');
}

if (argv.stage !== 'stage1' && argv.stage !== 'stage2' && argv.stage !== 'stage3' && argv.stage !== 'playoffs') {
  throw new Error('Stage must be stage1, stage2, stage3 or playoffs');
}

export const CONFIG = {
  MODEL_API_KEY: getRequiredEnvVar('MODEL_API_KEY'),
  BASE_URL: getRequiredEnvVar('BASE_URL'),
  MODEL: getRequiredEnvVar('MODEL'),
  MODEL_PROVIDER: process.env.MODEL_PROVIDER,
  IS_REASONING_MODEL: (process.env.IS_REASONING_MODEL ?? 'true') === 'true',
  HEADLESS: (process.env.HEADLESS ?? 'true') === 'true',
  VERBOSE: (process.env.VERBOSE ?? 'false') === 'true',
  CACHE: (process.env.CACHE ?? 'true') === 'true',
  LOOK_FOR_NEW_ARTICLES: (process.env.LOOK_FOR_NEW_ARTICLES ?? 'true') === 'true',
  MATCH: {
    HOME: argv.home,
    AWAY: argv.away,
    BESTOF: argv.bestof,
    MAJOR: argv.major,
    STAGE: argv.stage,
  },
};