import { useDispatch } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { initAuth, login, signUp } from 'services/auth';
import { setUserState } from 'store/user-slice';
import { ICredentials } from 'services/auth/types';

// 회원가입
export const useSignUp = (credential: ICredentials) =>
  useMutation(() => signUp(credential));

// 로그인
export const useLogin = (credential: ICredentials) => {
  const queryClient = useQueryClient();

  return useMutation(() => login(credential), {
    onSuccess: () => queryClient.invalidateQueries('initAuth'),
  });
};

// 인증 상태 확인
export const useInitAuth = () => {
  const dispatch = useDispatch();

  return useQuery('initAuth', initAuth, {
    onSuccess: (data) => {
      dispatch(setUserState(data));
    },
  });
};
