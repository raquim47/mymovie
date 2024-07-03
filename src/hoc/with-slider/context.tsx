import { createContext, useContext, useState, useEffect } from 'react';
import { Direction, ISliderContext, ISliderProviderProps } from './types';

const SliderContext = createContext<ISliderContext<unknown>>({
  index: 0,
  listSize: 1,
  direction: 'next',
  onClickSlideBtn: () => {},
  slicedData: [],
});

export const SliderProvider = <T,>({
  children,
  data,
  listSize,
}: ISliderProviderProps<T>) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>('next');
  const [isAnimating, setIsAnimating] = useState(false);
  const maxIndex = Math.floor((data.length - 1) / listSize);
  const slicedData = data.slice(listSize * index, listSize * index + listSize);
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
      value={{ index, listSize, direction, onClickSlideBtn, slicedData }}
    >
      {children}
    </SliderContext.Provider>
  );
};

export const useSliderContext = <T,>() =>
  useContext(SliderContext) as ISliderContext<T>;
