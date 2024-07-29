import { queryClient } from 'config';
import { MutationFunction, useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { addToast } from 'store/toast';

const useUsersMutation = <T = unknown>(
  mutationFn: MutationFunction<void, T>,
  movieId?: number
) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      if (movieId) queryClient.invalidateQueries({ queryKey: ['movies', movieId] });
      queryClient.invalidateQueries({ queryKey: ['initUser'] });
    },
    onError: (error: Error) => {
      dispatch(addToast(error.message));
    },
  });
};

export default useUsersMutation;
