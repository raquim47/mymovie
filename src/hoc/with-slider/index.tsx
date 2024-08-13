import { ComponentType, useState } from 'react';
import SlideBtns from './buttons';
import Slide from './slide';
import * as S from './styles';
import { Direction, IListProps } from './types';

const withSlider = <T,>(List: ComponentType<IListProps<T>>) => {
  return ({ data, listSize }: IListProps<T>) => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState<Direction>('next');
    const [isAnimating, setIsAnimating] = useState(false);
    const maxIndex = Math.floor((data.length - 1) / listSize);
    const slicedData = data.slice(listSize * index, listSize * index + listSize);

    const handleNext = () => {
      if (isAnimating) return;
      setDirection('next');
      setIndex((prevIndex) => (prevIndex + 1 > maxIndex ? 0 : prevIndex + 1));
    };

    const handlePrev = () => {
      if (isAnimating) return;
      setDirection('prev');
      setIndex((prevIndex) => (prevIndex - 1 < 0 ? maxIndex : prevIndex - 1));
    };

    const exitAnimating = () => {
      setIsAnimating(false);
    };

    return (
      <S.WithSliderBox>
        <Slide index={index} direction={direction} exitAnimating={exitAnimating}>
          <List data={slicedData} listSize={listSize} />
        </Slide>
        <SlideBtns handleNext={handleNext} handlePrev={handlePrev} />
      </S.WithSliderBox>
    );
  };
};

export default withSlider;
