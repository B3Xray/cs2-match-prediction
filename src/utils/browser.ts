import type { Browser, Page, Locator } from 'patchright';
import { chromium } from 'patchright';
import { CONFIG } from '../config';

let browser: Browser | null = null;

export const getBrowser = async (): Promise<Browser> => {
  if (browser) {
    return browser;
  }

  browser = await chromium.launch({
    headless: CONFIG.HEADLESS,
    args: [
      '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    ],
  });

  return browser;
};

export const navigateTo = async (url: string): Promise<Page> => {
  const browser = await getBrowser();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  return page;
};