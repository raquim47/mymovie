import { FirebaseError } from 'firebase/app';
import { CustomError, ERRORS, FIREBASE_ERRORS } from './errors';

const handleRequest = async <T>(request: () => Promise<T>) => {
  try {
    await request();
  } catch (error) {
    if (error instanceof FirebaseError && FIREBASE_ERRORS[error.code]) {
      throw FIREBASE_ERRORS[error.code];
    }
    throw new CustomError(
      `${ERRORS.REQUEST_ERROR} ${error instanceof Error && error.message}`
    );
  }
};

export default handleRequest;
