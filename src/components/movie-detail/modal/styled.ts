import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Overay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: ${(props) => props.theme.zIndex.popup};
`;

export const Inner = styled(motion.div)`
  width: 100%;
  height: 100%;

  @media (min-width: 769px) {
    width: 80%;
    height: 80%;
    border-radius: 10px;
    overflow: hidden;
  }

  @media (min-width: 961px) {
    width: 70%;
    height: 70%;
    max-width: 800px;
    border-radius: 10px;
    overflow: hidden;
  }
`;
