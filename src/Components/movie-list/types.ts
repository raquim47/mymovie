import { IMovie } from "../../services/movieApi";

export interface IMovieListProps {
  data: IMovie[];
  rowSize: number;
  title: string;
}

export interface IMovieItem {
  movieData: IMovie;
  listType: string;
  index: number;
  hoveredIndex: number;
  onHoverChange: (index: number) => void;
  rowSize: number;
  displayMode: 'portrait' | 'landscape';
  keyword?: string;
}

