import { queryClient } from 'index';
import { useMutation } from 'react-query';
import { updateUserImage, updateNickName } from 'services/user';

export const useSetNickName = () => {
  return useMutation((nickName: string) => updateNickName(nickName), {
    onSuccess: () => {
      queryClient.invalidateQueries('initAuth');
    },
    onError: (error) => {
      alert('요청이 실패했습니다.' + error);
    },
  });
};

export const useSetUserImage = () => {
  return useMutation(updateUserImage, {
    onSuccess: () => queryClient.invalidateQueries('initAuth'),
    onError: (error) => alert('요청이 실패했습니다.' + error),
  });
};
