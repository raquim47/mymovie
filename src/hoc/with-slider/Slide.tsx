import { ComponentType } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSliderContext } from './context';
import { SlideContent, RatioBox, SlideRow } from './styled';
import { Direction, ISliderProps } from './types';

const Slide = <T,>({
  Component,
}: {
  Component: ComponentType<ISliderProps<T>>;
}) => {
  const { index, direction, slicedData, listSize, title } =
    useSliderContext<T>();

  const rowVariants = {
    hidden: ({ direction }: { direction: Direction }) => ({
      x: direction === 'next' ? 'calc(100% + 10px)' : 'calc(-100% - 10px)',
    }),
    visible: {
      x: 0,
    },
    exit: ({ direction }: { direction: Direction }) => ({
      x: direction === 'next' ? 'calc(-100% - 10px)' : 'calc(100% + 10px)',
    }),
  };

  return (
    <SlideContent>
      <RatioBox>
        <AnimatePresence
          initial={false}
          custom={{ direction }}
        >
          <SlideRow
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'tween', duration: 1 }}
            key={index}
            custom={{ direction }}
          >
            <Component listSize={listSize} data={slicedData} title={title} />
          </SlideRow>
        </AnimatePresence>
      </RatioBox>
    </SlideContent>
  );
};

export default Slide;
