import { ComponentType } from 'react';
import { SliderProvider } from './context';
import Slide from './Slide';
import SlideBtns from './SlideBtns';
import { SlideWrapper, ListTitle } from './styles';
import { ISliderProps } from './types';

const withSlider = <T,>(Component: ComponentType<ISliderProps<T>>) => {
  return ({ data, rowSize, title }: ISliderProps<T>) => {
    return (
      <SliderProvider<T> data={data} rowSize={rowSize} title={title}>
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
