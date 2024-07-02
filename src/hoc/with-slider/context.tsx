import { createContext, useContext, useState, useEffect } from 'react';
import { Direction, ISliderContext, ISliderProviderProps } from './types';

const SliderContext = createContext<ISliderContext<unknown>>({
  index: 0,
  rowSize: 1,
  direction: 'next',
  title: '',
  onClickSlideBtn: () => {},
  slicedData: [],
});

export const SliderProvider = <T,>({
  children,
  data,
  rowSize,
  title,
}: ISliderProviderProps<T>) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>('next');
  const [isAnimating, setIsAnimating] = useState(false);
  const maxIndex = Math.floor((data.length - 1) / rowSize);
  const slicedData = data.slice(rowSize * index, rowSize * index + rowSize);
  const ANIMATION_DURATION = 1000;

  const onClickSlideBtn = (direction: Direction) => {
    if (isAnimating) return;

    const newIndex =
      direction === 'next'
        ? index + 1 > maxIndex
          ? 0
          : index + 1
        : index - 1 < 0
        ? maxIndex
        : index - 1;

    setIndex(newIndex);
    setIsAnimating(true);
    setDirection(direction);
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isAnimating) {
      timer = setTimeout(() => {
        setIsAnimating(false);
      }, ANIMATION_DURATION);
    }
    return () => clearTimeout(timer);
  }, [isAnimating]);

  return (
    <SliderContext.Provider
      value={{ index, rowSize, title, direction, onClickSlideBtn, slicedData }}
    >
      {children}
    </SliderContext.Provider>
  );
};

export const useSliderContext = <T,>() => useContext(SliderContext) as ISliderContext<T>;
