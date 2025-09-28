export type Table<T = any> = {
  headers: string[];
  body: T[][];
};