import { Team } from '../teams';

export class Article {
  constructor(
    public readonly title: string,
    public readonly content: string,
    public readonly team: Team,
  ) {}

  public toString(): string {
    return `Title: ${this.title}\n${this.content}`;
  }
}