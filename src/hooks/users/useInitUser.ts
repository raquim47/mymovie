import { useQuery } from '@tanstack/react-query';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth, getUserDoc } from 'utils/firebase';
import { addToast } from 'store/toast';
import { setUserState } from 'store/user';
import { IUser } from 'store/user/types';
import { ERRORS } from 'utils/errors';

const requestUserState = (): Promise<IUser | null> =>
  new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      async (user) => {
        if (user) {
          const { userData } = await getUserDoc(user.uid);
          resolve(userData);
        } else {
          resolve(null);
        }
      },
      (error) => {
        reject(new Error(ERRORS.AUTH_ERROR + ' : ' + error.message));
      }
    );
  });

const useInitUser = () => {
  const dispatch = useDispatch();

  const { data, error } = useQuery({
    queryKey: ['initUser'],
    queryFn: requestUserState,
  });
  useEffect(() => {
    if (data !== undefined) {
      dispatch(setUserState(data));
    }
    if (error) {
      dispatch(setUserState(null));
      dispatch(addToast(error.message));
    }
  }, [data, error, dispatch]);
};

export default useInitUser;
