import { useSlider } from 'hooks/ui/slider';
import { ComponentType } from 'react';
import Slide from './Slide';
import SlideBtns from './SlideBtns';
import ST from './styles';
import { IListProps } from './types';

const withSlider = <T,>(ListComponent: ComponentType<IListProps<T>>) => {
  return ({ data, listSize }: IListProps<T>) => {
    const { index, slicedData, handleClickSlideBtn, direction, exitAnimating } =
      useSlider(data, listSize);
    return (
      <ST.Container>
        <Slide index={index} direction={direction} exitAnimating={exitAnimating}>
          <ListComponent data={slicedData} listSize={listSize} />
        </Slide>
        <SlideBtns onClickSlideBtn={handleClickSlideBtn} />
      </ST.Container>
    );
  };
};

export default withSlider;
