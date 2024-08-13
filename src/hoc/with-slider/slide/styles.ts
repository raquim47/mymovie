import { motion } from "framer-motion";
import styled from "styled-components";

export const SlideBox = styled.div`
  overflow: hidden;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const RatioBox = styled.div`
  position: relative;
  padding-top: 24%;

  @media (min-width: 576px) {
    padding-top: 18%;
  }
  @media (min-width: 768px) {
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