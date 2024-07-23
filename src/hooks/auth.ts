import { useDispatch } from 'react-redux';
import { MutationFunction, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { setFieldError } from 'store/auth-form';

import {
  requestGoogleLogin,
  requestLogin,
  requestLogout,
  requestSignUp,
} from 'services/auth';
import { queryClient } from 'config';
import { addToast } from 'store/toast';
import { ERRORS, FIREBASE_AUTH_ERRORS } from 'utils/error';

const useAuthMutation = <T = void>(mutationFn: MutationFunction<void, T>) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('initUser');
      navigate('/');
    },
    onError: (error: Error) => {
      const firebaseError = FIREBASE_AUTH_ERRORS[error.message];
      if (!firebaseError) {
        dispatch(addToast(`${ERRORS.SERVER_ERROR}/${error.message}`));
        return;
      }

      switch (firebaseError.name) {
        case 'popup-close':
          break;
        case 'email':
        case 'nickName':
        case 'password':
          dispatch(
            setFieldError({ field: firebaseError.name, error: firebaseError.message })
          );
          break;
        default:
          dispatch(addToast(firebaseError.message));
          break;
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
