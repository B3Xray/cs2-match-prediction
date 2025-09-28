import * as fs from 'fs/promises';

export const CACHE = async (path: string): Promise<boolean> => {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
};

export const LOOK_FOR_NEW_ARTICLES = true;