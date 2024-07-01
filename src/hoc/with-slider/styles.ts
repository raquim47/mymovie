import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ListTitle = styled.h3`
  font-size: ${(props) => props.theme.fontSizePx.l};
  font-weight: 500;
  @media only screen and (max-width: 960px) {
    font-size: ${(props) => props.theme.fontSizeVw.l};
  }
  @media only screen and (max-width: 768px) {
    font-size: ${(props) => props.theme.fontSizeVw['3xl']};
  }
`;

export const SlideWrapper = styled.div`
  position: relative;
  padding-bottom: 15px;
  :hover button {
    opacity: 1;
  }
`;

export const Content = styled.div`
  overflow: hidden;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const ContentInner = styled.div`
  position: relative;
  padding-top: 10%;
`;

export const Row = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr); // 1200px 이하일 때 4개 행
  }
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); // 1024px 이하일 때 3개 행
  } */
`;

export const NextBtn = styled(motion.button)`
  position: absolute;
  left: calc(100% + 4px);
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0);
  color: white;
  right: auto;
  border: none;
  opacity: 0;
  cursor: pointer;
  :hover {
    filter: brightness(1.5);
  }
`;

export const PrevBtn = styled(NextBtn)`
  left: auto;
  right: calc(100% + 4px);
`;
