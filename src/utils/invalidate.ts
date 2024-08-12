import { queryClient } from 'config';

export const invalidateUser = async () => {
  await queryClient.invalidateQueries({ queryKey: ['user'] });
};