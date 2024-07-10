import styled from 'styled-components';
import { motion } from 'framer-motion';

export const SlideWrapper = styled.div`
  position: relative;
  padding-bottom: 10px;
  :hover button {
    opacity: 1;
  }
`;

export const SlideContent = styled.div`
  overflow: hidden;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const RatioBox = styled.div`
  position: relative;
  padding-top: 16%;

  @media (min-width: 769px) {
    padding-top: 12%;
  }
  @media (min-width: 1201px) {
    padding-top: 10%;
  }
`;

export const SlideRow = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const NextBtn = styled(motion.button)`
  position: absolute;
  left: calc(100% + 4px);
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0);
  color: white;
  right: auto;
  opacity: 0;
  
  :hover {
    filter: brightness(1.5);
  }
`;

export const PrevBtn = styled(NextBtn)`
  left: auto;
  right: calc(100% + 4px);
`;
