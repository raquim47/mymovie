import { ReactNode } from 'react';

export type Direction = 'next' | 'prev';

export interface ISliderContext<T> {
  index: number;
  direction: Direction;
  title: string;
  listSize: number;
  slicedData: T[];
  onClickSlideBtn: (direction: Direction) => void;
}

export interface ISliderProps<T> {
  listSize: number;
  data: T[];
  title: string;
}

export interface ISliderProviderProps<T> extends ISliderProps<T> {
  children: ReactNode;
}
