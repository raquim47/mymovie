import { queryClient } from 'config';
import { ChangeEvent } from 'react';
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

// 닉네임 변경
export const useSetNickName = () => useUserMutation(updateNickName);

// 이미지 변경
export const useSetUserImage = () => {
  const { mutate, isLoading } = useUserMutation(updateUserImage);

  const imageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      mutate(file);
      event.target.value = '';
    }
  };
  const imageRemove = () => mutate(null);

  return { imageUpload, imageRemove, isLoading };
};

// 찜하기 추가/취소
export const useSetWatchList = () => useUserMutation(updateWatchList);

// 별점 추가/취소
export const useSetMovieRating = () => useUserMutation(updateMovieRating);
