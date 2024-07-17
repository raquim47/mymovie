import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  position: relative;
  padding-bottom: 10px;
  :hover button {
    opacity: 1;
  }
`;

const Content = styled.div`
  overflow: hidden;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const RatioBox = styled.div`
  position: relative;
  padding-top: 16%;

  @media (min-width: 769px) {
    padding-top: 12%;
  }
  @media (min-width: 1201px) {
    padding-top: 10%;
  }
`;

const SlideRow = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const NextBtn = styled.button`
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

const PrevBtn = styled(NextBtn)`
  left: auto;
  right: calc(100% + 4px);
`;

const ST = { Container, Content, RatioBox, SlideRow, NextBtn, PrevBtn };
export default ST;
