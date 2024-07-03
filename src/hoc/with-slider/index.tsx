import { ComponentType } from 'react';
import { SliderProvider } from './context';
import Slide from './Slide';
import SlideBtns from './SlideBtns';
import { SlideWrapper } from './styled';
import { ISliderProps } from './types';

const withSlider = <T,>(Component: ComponentType<ISliderProps<T>>) => {
  return ({ data, listSize }: ISliderProps<T>) => {
    return (
      <SliderProvider<T> data={data} listSize={listSize}>
        <SlideWrapper>
          <Slide Component={Component} />
          <SlideBtns />
        </SlideWrapper>
      </SliderProvider>
    );
  };
};

export default withSlider;
