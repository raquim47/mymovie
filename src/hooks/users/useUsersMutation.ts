import { queryClient } from 'config';
import { MutationFunction, useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { addToast } from 'store/toast';

const useUsersMutation = <T = unknown>(mutationFn: MutationFunction<void, T>) => {
  const dispatch = useDispatch();

  return useMutation(mutationFn, {
    onSuccess: () => queryClient.invalidateQueries('initUser'),
    onError: (error: Error) => {
      dispatch(addToast(error.message));
    },
  });
};

export default useUsersMutation;
