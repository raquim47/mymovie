import { IMovieDetails } from "services/movies/types";

export interface IMovieListProps {
  data: IMovieDetails[];
  listSize: number;
  title: string;
}

export interface IMovieItem {
  movieData: IMovieDetails;
  listType: string;
  index: number;
  hoveredIndex: number;
  onHoverChange: (index: number) => void;
  listSize: number;
  displayMode: 'portrait' | 'landscape';
  keyword?: string;
}

