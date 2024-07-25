import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { requestUserState } from 'services/user';
import { addToast } from 'store/toast';
import { setUserState } from 'store/user';

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
