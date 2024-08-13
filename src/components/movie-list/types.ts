import { IMovie } from "services/movies/types";

export interface IMovieListProps {
  data: IMovie[];
  listSize: number;
  imageType?: 'poster' | 'backdrop';
}
