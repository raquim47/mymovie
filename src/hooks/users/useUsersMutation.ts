import { queryClient } from 'config';
import { MutationFunction, useMutation } from '@tanstack/react-query';
import useToast from 'hooks/ui/useToast';

const useUsersMutation = <T = unknown>(
  mutationFn: MutationFunction<void, T>,
  movieId?: number
) => {
  const toast = useToast();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      if (movieId) queryClient.invalidateQueries({ queryKey: ['movies', movieId] });
      queryClient.invalidateQueries({ queryKey: ['initUser'] });
    },
    onError: (error) => toast(error.message),
  });
};

export default useUsersMutation;
