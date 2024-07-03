import { motion } from 'framer-motion';
import styled from 'styled-components';

export const UL = styled.ul<{ listSize: number }>`
  height: 100%;
  display: grid;
  grid-template-columns: ${({ listSize }) => `repeat(${listSize}, 1fr)`};
  gap: 1%;
`;

export const Bg = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Info = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  color: ${(props) => props.theme.color.white.normal};
  opacity: 0;
  transition: opacity 0.1s ease-in-out 0.2s;

  h4 {
    font-size: ${(props) => props.theme.fontSizePx.m};
    font-weight: 500;
    margin-bottom: 0.4vw;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    @media only screen and (max-width: 1200px) {
      font-size: ${(props) => props.theme.fontSizeVw.m};
    }
    @media only screen and (max-width: 960px) {
      font-size: ${(props) => props.theme.fontSizeVw.xl};
    }
  }
  small {
    font-weight: 400;
    font-size: ${(props) => props.theme.fontSizeVw.xs};
    @media only screen and (max-width: 960px) {
      font-size: ${(props) => props.theme.fontSizeVw.m};
    }
  }

  article {
    display: flex;
    gap: 5px;
    span {
      margin-top: 0.2vw;
      font-size: ${(props) => props.theme.fontSizeVw.xs};
      @media only screen and (max-width: 960px) {
        font-size: ${(props) => props.theme.fontSizeVw.m};
      }
    }
  }
`;

export const LI = styled(motion.li)`
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;

  &:last-of-type {
    transform-origin: center right;
  }
  &:first-of-type {
    transform-origin: center left;
  }

  img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover ${Info} {
    opacity: 1;
  }
`;

export const RateStar = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 1vw;
  width: 100%;
  z-index: ${(props) => props.theme.zIndex.rateStar};
  .icon span {
    font-size: 1.5vw !important;
  }
`;

export const InitialDetailBox = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: ${(props) => props.theme.zIndex.initialDetailBox};
`;
