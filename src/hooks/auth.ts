import { useDispatch } from 'react-redux';
import { useMutation, useQuery } from 'react-query';
import { googleLogin, initAuth, login, logout, signUp } from 'services/auth';
import { setUserState } from 'store/user';
import { ILoginCredentials, ISignUpCredentials } from 'services/auth/types';
import { useNavigate } from 'react-router-dom';
import { setErrors } from 'store/auth-form';
import { queryClient } from 'index';

export const useAuthSuccessHandler = () => {
  const navigate = useNavigate();

  return () => {
    queryClient.invalidateQueries('initAuth');
    navigate('/');
  };
};

export const useAuthErrorHandler = () => {
  const dispatch = useDispatch();

  return (error: unknown) => {
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
  };
};

// 회원가입
export const useSignUp = () => {
  const handleSuccess = useAuthSuccessHandler();
  const handleError = useAuthErrorHandler();

  return useMutation((credential: ISignUpCredentials) => signUp(credential), {
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

// 로그인
export const useLogin = () => {
  const handleSuccess = useAuthSuccessHandler();
  const handleError = useAuthErrorHandler();

  return useMutation((credential: ILoginCredentials) => login(credential), {
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export const useGoogleLogin = () => {
  const handleSuccess = useAuthSuccessHandler();
  const handleError = useAuthErrorHandler();

  return useMutation(googleLogin, {
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

// 로그아웃
export const useLogout = () => {
  const handleSuccess = useAuthSuccessHandler();
  return useMutation(logout, {
    onSuccess: handleSuccess,
  });
};

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
