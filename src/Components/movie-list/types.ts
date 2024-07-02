import { IMovieDetails } from "services/movies/types";

export interface IMovieListProps {
  data: IMovieDetails[];
  rowSize: number;
  title: string;
}

export interface IMovieItem {
  movieData: IMovieDetails;
  listType: string;
  index: number;
  hoveredIndex: number;
  onHoverChange: (index: number) => void;
  rowSize: number;
  displayMode: 'portrait' | 'landscape';
  keyword?: string;
}

