import { onAuthStateChanged } from 'firebase/auth';
import { ERRORS } from 'utils/errors';
import { auth, getUserDoc } from 'utils/firebase';
import { IUser } from './types';

const requestUser = (): Promise<IUser | null> =>
  new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      async (user) => {
        try {
          if (user) {
            const { userData } = await getUserDoc(user.uid);
            resolve(userData);
          } else {
            resolve(null);
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          reject(new Error(`${ERRORS.AUTH_ERROR} : ${errorMessage}`));
        }
      },
      (error) => {
        reject(new Error(ERRORS.AUTH_ERROR + ' : ' + error.message));
      }
    );
  });

export default requestUser;
