import { queryClient } from 'config';
import { MutationFunction, useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFieldError } from 'store/auth-form';
import { addToast } from 'store/toast';
import { FIREBASE_AUTH_ERRORS } from 'utils/error';

const useAuthMutation = <T = void>(mutationFn: MutationFunction<void, T>) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['initUser'] });
      navigate('/');
    },
    onError: (error: Error) => {
      const firebaseError = FIREBASE_AUTH_ERRORS[error.message];
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
      dispatch(addToast(firebaseError?.message || error.message));
    },
  });
};

export default useAuthMutation;
