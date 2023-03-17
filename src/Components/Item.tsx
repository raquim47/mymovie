import { motion } from 'framer-motion';
import styled from 'styled-components';
import { IMovie } from '../api';
import { makeImagePath } from '../utils';

const Wrapper = styled(motion.div)<{ $bgPhoto: string }>`
  border-radius: 4px;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-of-type {
    transform-origin: center left;
  }
  &:last-of-type {
    transform-origin: center right;
  }
  border: 1px solid red;
`;

const WrapperVariants = {
  initial: {
    scale: 1.3,
  },
  hover: {
    scale: 1.3,
    transition: {
      type: 'tween',
      duration: 0.2,
      delay: 0.3,
    },
  },
};

interface IItem {
  movieData: IMovie;
  listType?: string;
  hoverAnimation?: boolean;
  forBanner?: boolean;
}
function Item({
  movieData,
  listType,
  hoverAnimation = false,
  forBanner = false,
}: IItem) {
  return (
    <Wrapper
    
      style={{ border: '1px solid red' }}
      $bgPhoto={
        movieData.backdrop_path
          ? makeImagePath(movieData.backdrop_path, 'w500')
          : require('../assets/no-image-icon-6.png')
      }
    >
      {movieData.title}
    </Wrapper>
  );
}

export default Item;
