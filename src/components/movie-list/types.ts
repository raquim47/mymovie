import { IMovieDetails } from 'services/movies/types';

export interface IMovieListProps {
  data: IMovieDetails[];
  listSize: number;
}
