import { TMDB_CONFIG } from 'config';
import { FirebaseError } from 'firebase/app';
import { CustomError, ERRORS, FIREBASE_ERRORS } from './errors';

export const handleRequest = async <T>(request: () => Promise<T>) => {
  try {
    const result = await request();
    return result;
  } catch (error) {
    if (error instanceof FirebaseError && FIREBASE_ERRORS[error.code]) {
      throw FIREBASE_ERRORS[error.code];
    }
    throw new CustomError(
      `${ERRORS.REQUEST_ERROR} ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

export const handleRequestTMDB = async <T>(path: string): Promise<T> => {
  const querySeparator = path.includes('?') ? '&' : '?';
  const url = `${TMDB_CONFIG.basePath}/${path}${querySeparator}${TMDB_CONFIG.tailPath}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(ERRORS.REQUEST_ERROR);
    }
    return await response.json();
  } catch (error) {
    throw new CustomError(
      `${ERRORS.REQUEST_ERROR} ${error instanceof Error ? error.message : String(error)}`
    );
  }
};
