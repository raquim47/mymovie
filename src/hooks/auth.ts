import { useDispatch } from 'react-redux';
import { MutationFunction, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { setFieldError } from 'store/auth-form';
import { queryClient } from 'index';
import {
  requestGoogleLogin,
  requestLogin,
  requestLogout,
  requestSignUp,
} from 'services/auth';

const useAuthMutation = <T = void>(mutationFn: MutationFunction<void, T>) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('initUser');
      navigate('/');
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        const { name, message } = JSON.parse(error.message);
        if (name === 'popup-close') {
          return;
        }

        if (name === 'global') {
          alert(message);
        } else {
          dispatch(setFieldError({ field: name, error: message }));
        }
      } else {
        alert('요청이 실패했습니다. 다시 시도해주세요.');
      }
    },
  });
};

// 로그인
export const useLogin = () => useAuthMutation(requestLogin);

// 구글 로그인
export const useGoogleLogin = () => useAuthMutation(requestGoogleLogin);

// 회원가입
export const useSignUp = () => useAuthMutation(requestSignUp);

// 로그아웃
export const useLogout = () => useAuthMutation(requestLogout);
