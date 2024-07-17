import { ReactNode } from 'react';

export type Direction = 'next' | 'prev';

export interface IListProps<T> {
  listSize: number;
  data: T[];
}

export interface ISlideProps {
  children: ReactNode;
  index: number;
  direction: Direction;
  exitAnimating: () => void;
}

export interface ISlideBtnsProps {
  onClickSlideBtn: (direction: Direction) => void;
}
