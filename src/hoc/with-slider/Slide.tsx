import { ComponentType } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSliderContext } from './context';
import { Content, ContentInner, Row } from './styles';
import { Direction } from './types';
import { IMovieListProps } from '../../components/movie-list/types';

const Slide = ({ Component }: { Component: ComponentType<IMovieListProps> }) => {
  const { index, direction, slicedData, rowSize, title } = useSliderContext();

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
    <Content>
      <ContentInner>
        <AnimatePresence
          initial={false}
          custom={{ direction }}
          onExitComplete={() => console.log(index)}
        >
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'tween', duration: 1 }}
            key={index}
            custom={{ direction }}
          >
            <Component rowSize={rowSize} data={slicedData} title={title} />
          </Row>
        </AnimatePresence>
      </ContentInner>
    </Content>
  );
};

export default Slide;
