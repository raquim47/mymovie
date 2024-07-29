import { IMovie } from 'hooks/movies/types';

export interface IMovieListProps {
  data: IMovie[];
  listSize: number;
  imageType?: 'poster' | 'backdrop';
}
