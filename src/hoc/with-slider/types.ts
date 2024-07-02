import { ReactNode } from 'react';
import { IMovieDetails } from 'services/movies/types';

export type Direction = 'next' | 'prev';

export interface ISliderContext {
  index: number;
  direction: Direction;
  title: string;
  rowSize: number;
  slicedData: IMovieDetails[];
  onClickSlideBtn: (direction: Direction) => void;
}

export interface ISliderProviderProps {
  children: ReactNode;
  rowSize: number;
  data: IMovieDetails[];
  title: string;
}
