import { useDispatch } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { initAuth, login, signUp } from 'services/auth';
import { setUserState } from 'store/user';
import { ILoginCredentials, ISignUpCredentials } from 'services/auth/types';

// 회원가입
export const useSignUp = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) =>
  useMutation((credential: ISignUpCredentials) => signUp(credential), {
    onSuccess,
    onError,
  });

// 로그인
export const useLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation((credential: ILoginCredentials) => login(credential), {
    onSuccess: () => {
      queryClient.invalidateQueries('initAuth');
      onSuccess && onSuccess();
    },
    onError,
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
