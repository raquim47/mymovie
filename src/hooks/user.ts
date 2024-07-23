import { queryClient } from 'config';
import { MutationFunction, useMutation, useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import {
  updateUserImage,
  updateNickName,
  requestUserState,
  updateWatchList,
  updateMovieRating,
} from 'services/user';
import { addToast } from 'store/toast';
import { setUserState } from 'store/user';
import { IUser } from 'store/user/types';

// 사용자 정보 초기화
export const useInitUser = () => {
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

const useUserMutation = <T = unknown>(mutationFn: MutationFunction<void, T>) => {
  const dispatch = useDispatch();

  return useMutation(mutationFn, {
    onSuccess: () => queryClient.invalidateQueries('initUser'),
    onError: (error: Error) => {
      dispatch(addToast(error.message));
    },
  });
};

export const useSetNickName = () => useUserMutation(updateNickName);

export const useSetUserImage = () => useUserMutation(updateUserImage);

export const useSetWatchList = () => useUserMutation(updateWatchList);

export const useSetMovieRating = () => useUserMutation(updateMovieRating);
