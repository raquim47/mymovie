import { FirebaseError } from 'firebase/app';
import { CustomError, ERRORS, FIREBASE_ERRORS } from './errors';

const handleRequest = async <T>(request: () => Promise<T>) => {
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

export default handleRequest;
