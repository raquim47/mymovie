import { queryClient } from 'index';
import { useMutation, useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { updateUserImage, updateNickName, requestUserState } from 'services/user';
import { setUserState } from 'store/user';
import { IUser } from 'store/user/types';
import { IError } from 'utils/error';

// 사용자 정보 초기화
export const useInitUser = () => {
  const dispatch = useDispatch();

  return useQuery<IUser | null, IError>('initUser', requestUserState, {
    onSuccess: (user) => {
      dispatch(setUserState(user));
    },
  });
};

export const useSetNickName = () => {
  return useMutation((nickName: string) => updateNickName(nickName), {
    onSuccess: () => {
      queryClient.invalidateQueries('initUser');
    },
    onError: (error) => {
      alert('요청이 실패했습니다.' + error);
    },
  });
};

export const useSetUserImage = () => {
  return useMutation(updateUserImage, {
    onSuccess: () => queryClient.invalidateQueries('initUser'),
    onError: (error) => alert('요청이 실패했습니다.' + error),
  });
};
