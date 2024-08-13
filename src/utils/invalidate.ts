import { queryClient } from 'config';

export const invalidateUserMe = () =>
  queryClient.invalidateQueries({ queryKey: ['users', 'me'] });

export const invalidateUsers = () =>
  queryClient.invalidateQueries({ queryKey: ['users'] });

export const invalidateMovieDetail = (id: number) =>
  queryClient.invalidateQueries({ queryKey: ['movies', String(id)] });
