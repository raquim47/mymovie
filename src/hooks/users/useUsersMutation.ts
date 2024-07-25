import { queryClient } from 'config';
import { MutationFunction, useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { addToast } from 'store/toast';

const useUsersMutation = <T = unknown>(mutationFn: MutationFunction<void, T>) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['initUser'] }),
    onError: (error: Error) => {
      dispatch(addToast(error.message));
    },
  });
};

export default useUsersMutation;
