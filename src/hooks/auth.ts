import { useDispatch } from 'react-redux';
import { MutationFunction, useMutation, useQuery } from 'react-query';
import { googleLogin, initAuth, login, logout, signUp } from 'services/auth';
import { setUserState } from 'store/user';
import { useNavigate } from 'react-router-dom';
import { setErrors } from 'store/auth-form';
import { queryClient } from 'index';

const useAuthMutation = <T = void>(mutationFn: MutationFunction<void, T>) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('initAuth');
      navigate('/');
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);
        if (parsedError.name === 'popup-close') {
          return;
        }

        if (parsedError.name === 'global') {
          alert(parsedError.message);
        } else {
          dispatch(setErrors({ [parsedError.name]: parsedError.message }));
        }
      } else {
        alert('요청이 실패했습니다. 다시 시도해주세요.');
      }
    },
  });
};

// 로그인
export const useLogin = () => useAuthMutation(login);

// 구글 로그인
export const useGoogleLogin = () => useAuthMutation(googleLogin);

// 회원가입
export const useSignUp = () => useAuthMutation(signUp);

// 로그아웃
export const useLogout = () => useAuthMutation(logout);

// 인증 상태 확인
export const useInitAuth = () => {
  const dispatch = useDispatch();

  return useQuery('initAuth', initAuth, {
    onSuccess: (user) => {
      dispatch(
        setUserState(
          user
            ? {
                email: user.email,
                displayName: user.displayName,
                uid: user.uid,
                photoURL: user.photoURL,
              }
            : null
        )
      );
    },
  });
};
