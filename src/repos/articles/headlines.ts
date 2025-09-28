import { getBrowser } from '../../utils/browser';
import { Article } from './entity';
import { Team } from '../teams';

export const getArticle = async (team: string): Promise<{ title: string; link: string }[]> => {
  const browser = await getBrowser();
  const page = await browser.newPage();
  await page.goto(`https://www.hltv.org/search?query=${team}`);
  const articles = await page.$$eval('.search-result', (els: any) =>
    els.map((el: any) => ({
      title: el.querySelector('a').innerText,
      link: el.querySelector('a').href,
    })),
  );
  await page.close();
  return articles;
};

export const getArticleContent = async (url: string): Promise<string> => {
  const browser = await getBrowser();
  const page = await browser.newPage();
  await page.goto(url);
  const content = await page.$eval('.article-body', (el: any) => el.innerText);
  await page.close();
  return content;
};