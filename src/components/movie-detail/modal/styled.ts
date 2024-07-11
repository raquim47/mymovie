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

export const Inner = styled(motion.div)``;
