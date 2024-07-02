import { ComponentType } from 'react';
import { IMovieListProps } from '@/components/movie-list/types';
import { SliderProvider } from './context';
import Slide from './Slide';
import SlideBtns from './SlideBtns';
import { SlideWrapper, ListTitle } from './styles';

const withSlider = (Component: ComponentType<IMovieListProps>) => {
  return ({ data, rowSize, title }: IMovieListProps) => {
    return (
      <SliderProvider data={data} rowSize={rowSize} title={title} >
        <ListTitle>{title}</ListTitle>
        <SlideWrapper>
          <Slide Component={Component} />
          <SlideBtns />
        </SlideWrapper>
      </SliderProvider>
    );
  };
};

export default withSlider;
