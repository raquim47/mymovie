import { motion } from 'framer-motion';
import styled from 'styled-components';

export const InitialDetailBox = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${(props) => props.theme.zIndex.initialDetailBox};
`;
