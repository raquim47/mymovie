import { Direction } from 'hoc/with-slider/types';
import { useState } from 'react';

export const useSlider = <T>(data: T[], listSize: number) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>('next');
  const [isAnimating, setIsAnimating] = useState(false);
  const maxIndex = Math.floor((data.length - 1) / listSize);
  const slicedData = data.slice(listSize * index, listSize * index + listSize);

  const handleClickSlideBtn = (direction: Direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(direction);

    let newIndex;
    if (direction === 'next') {
      if (index + 1 > maxIndex) {
        newIndex = 0;
      } else {
        newIndex = index + 1;
      }
    } else {
      if (index - 1 < 0) {
        newIndex = maxIndex;
      } else {
        newIndex = index - 1;
      }
    }

    setIndex(newIndex);
  };

  const exitAnimating = () => {
    setIsAnimating(false);
  };

  return { index, slicedData, direction, handleClickSlideBtn, exitAnimating };
};
