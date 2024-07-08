import { useDispatch } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { initAuth, login, signUp } from 'services/auth';
import { setUserState } from 'store/user';
// import { ICredentials } from 'services/auth/types';

// 회원가입
// export const useSignUp = () =>
//   useMutation((credential: ICredentials) => signUp(credential));

// 로그인
// export const useLogin = () => {
//   const queryClient = useQueryClient();

//   return useMutation((credential: ICredentials) => login(credential), {
//     onSuccess: () => queryClient.invalidateQueries('initAuth'),
//   });
// };

// 인증 상태 확인
export const useInitAuth = () => {
  const dispatch = useDispatch();

  return useQuery('initAuth', initAuth, {
    onSuccess: (data) => {
      dispatch(setUserState(data));
    },
  });
};
