import { ReactNode } from 'react';
import { IMovie } from '../../services/movieApi';

export type Direction = 'next' | 'prev';

export interface ISliderContext {
  index: number;
  direction: Direction;
  title: string;
  rowSize: number;
  slicedData: IMovie[];
  onClickSlideBtn: (direction: Direction) => void;
}

export interface ISliderProviderProps {
  children: ReactNode;
  rowSize: number;
  data: IMovie[];
  title: string;
}
