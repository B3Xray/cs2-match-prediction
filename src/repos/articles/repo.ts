import * as fs from 'fs/promises';
import * as path from 'path';
import { getArticle, getArticleContent } from './headlines';
import { newsAnalyst, NewsAnalysis } from '../../tools/news_analyst';
import { Article } from './entity';
import { Team } from '../teams';
import { CACHE, LOOK_FOR_NEW_ARTICLES } from '../../utils/path';

export class ArticleRepo {
  public async findByTeams(teams: Team[]): Promise<Article[]> {
    let articles: Article[] = [];
    for (const team of teams) {
      const teamArticles = await this.fetchFromMatchTeams(team);
      articles = [...articles, ...teamArticles];
    }
    return articles;
  }

  private async fetchFromMatchTeams(team: Team): Promise<Article[]> {
    const articlesPath = path.join(__dirname, '../../../../', 'articles-cached/');
    if (!(await CACHE(articlesPath))) {
      return [];
    }
    const files = await fs.readdir(articlesPath);
    const teamFiles = files.filter(file => file.startsWith(`${team.name}-`));
    let articles: Article[] = [];

    for (const file of teamFiles) {
      const articleTitle = file.replace(`${team.name}-`, '').replace('.json', '');
      const analysis: NewsAnalysis = JSON.parse(await fs.readFile(path.join(articlesPath, file), 'utf-8'));
      const article = new Article(articleTitle, analysis.summary, team);
      articles.push(article);
    }

    if (!LOOK_FOR_NEW_ARTICLES) return articles;

    const headlines = await getArticle(team.name);
    const newArticles = headlines.filter(
      headline => !articles.find(article => article.title === headline.title),
    );

    for (const headline of newArticles) {
      articles.push(await this.getArticleContent(headline.title, headline.link, team));
    }

    return articles;
  }

  private async getArticleContent(title: string, link: string, team: Team): Promise<Article> {
    const content = await getArticleContent(link);
    const { summary } = await newsAnalyst(new Article(title, content, team), team);
    return new Article(title, summary, team);
  }
}