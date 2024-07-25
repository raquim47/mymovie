import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { requestUserState } from 'services/user';
import { addToast } from 'store/toast';
import { setUserState } from 'store/user';
import { IUser } from 'store/user/types';

const useInitUser = () => {
  const dispatch = useDispatch();

  return useQuery<IUser | null, Error>('initUser', requestUserState, {
    onSuccess: (user) => {
      dispatch(setUserState(user));
    },
    onError: (error) => {
      dispatch(addToast(error.message));
      dispatch(setUserState(null));
    },
  });
};

export default useInitUser;
