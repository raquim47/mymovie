import { AnimatePresence } from 'framer-motion';
import * as S from './styles';
import { Direction, ISlideProps } from '../types';

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

const Slide = ({ children, index, direction, exitAnimating }: ISlideProps) => {
  return (
    <S.SlideBox>
      <S.RatioBox>
        <AnimatePresence
          initial={false}
          custom={{ direction }}
          onExitComplete={exitAnimating}
        >
          <S.SlideRow
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'tween', duration: 1 }}
            key={index}
            custom={{ direction }}
          >
            {children}
          </S.SlideRow>
        </AnimatePresence>
      </S.RatioBox>
    </S.SlideBox>
  );
};

export default Slide;
