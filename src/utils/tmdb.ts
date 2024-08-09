import { TMDB_CONFIG } from 'config';
import { ERRORS } from './errors';

export const handleRequestTMDB = async <T>(path: string): Promise<T> => {
  const querySeparator = path.includes('?') ? '&' : '?';
  const url = `${TMDB_CONFIG.basePath}/${path}${querySeparator}${TMDB_CONFIG.tailPath}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(ERRORS.REQUEST_ERROR);
  }
  return await response.json();
};
