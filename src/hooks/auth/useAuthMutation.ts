import { queryClient } from 'config';
import { MutationFunction, useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFieldError } from 'store/auth-form';
import { addToast } from 'store/toast';
import { ERRORS, FIREBASE_AUTH_ERRORS } from 'utils/error';
import { FirebaseError } from 'firebase/app';

const useAuthMutation = <T = void>(mutationFn: MutationFunction<void, T>) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['initUser'] });
      navigate('/');
    },
    onError: (error) => {
      if (error instanceof FirebaseError) {
        const firebaseError = FIREBASE_AUTH_ERRORS[error.code];
        if (firebaseError?.name === 'popup-close') return;

        if (
          firebaseError?.name === 'email' ||
          firebaseError?.name === 'nickName' ||
          firebaseError?.name === 'password'
        ) {
          dispatch(
            setFieldError({ field: firebaseError.name, error: firebaseError.message })
          );
          return;
        }
      }

      dispatch(addToast(ERRORS.REQUEST_ERROR + ' : ' + error.message));
    },
  });
};

export default useAuthMutation;
