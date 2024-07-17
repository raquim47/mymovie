import { AnimatePresence } from 'framer-motion';
import ST from './styles';
import { Direction, ISlideProps } from './types';

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
    <ST.Content>
      <ST.RatioBox>
        <AnimatePresence
          initial={false}
          custom={{ direction }}
          onExitComplete={exitAnimating}
        >
          <ST.SlideRow
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'tween', duration: 1 }}
            key={index}
            custom={{ direction }}
          >
            {children}
          </ST.SlideRow>
        </AnimatePresence>
      </ST.RatioBox>
    </ST.Content>
  );
};

export default Slide;
