import { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const GlobalStyle = createGlobalStyle<{ isScroll: boolean }>`
  body {
    overflow: hidden; 
    padding-right: ${(props) => (props.isScroll ? '6px' : 0)};
  }
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  z-index: ${(props) => props.theme.zIndex.popup};
`;

export const Wrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 70vw;
  max-width: 900px;
  height: 70vh;
  margin: auto;
  overflow: hidden;
  padding-bottom: 30px;
  border-radius: 25px;
  background-color: ${(props) => props.theme.color.black.light};
  z-index: ${(props) => props.theme.zIndex.popup};

  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
    padding-bottom: 0;
  }

  .closeBtn {
    position: absolute;
    top: 16px;
    right: 14px;
    width: 20px;
    height: 20px;
    transition: all 0.3s ease-in-out;
    color: white;
    cursor: pointer;
    :hover {
      scale: 1.3;
    }
  }
`;

export const DarkBox = styled.section`
  padding: 16px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.black.middle};
`;

export const Content = styled(motion.div)`
  position: relative;
  height: 100%;
  color: ${(props) => props.theme.color.white.normal};
  overflow: auto;

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #4e4e4e;
    border-radius: 100px;
  }
  ::-webkit-scrollbar-track {
    background-color: #4e4e4e;
    border-radius: 100px;
    background-clip: padding-box;
    border: 3px solid transparent;
  }
`;
export const ContentBg = styled.div<{ $bgPhoto: string }>`
  height: 380px;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
`;

// ContentTop
export const ContentTop = styled.div`
  position: relative;
  width: 100%;
  margin-top: -105px;
  padding-left: calc(30% + 40px);
  padding-right: 30px;

  @media only screen and (max-width: 960px) {
    padding-left: 10px;
    padding-right: 10px;
  }

  @media only screen and (max-width: 768px) {
    padding: 0;
    margin-top: 0;
  }
`;

export const DetailPoster = styled.div`
  position: absolute;
  left: 30px;
  bottom: 2px;
  width: 30%;
  border-radius: 4px;
  overflow: hidden;
  img {
    display: block;
    width: 100%;
  }

  @media only screen and (max-width: 960px) {
    left: auto;
    right: 30px;
    bottom: 105px;
    width: 20%;
  }

  @media only screen and (max-width: 768px) {
    right: 50%;
    transform: translateX(50%);
    min-width: 120px;
    bottom: calc(100% + 30px);
  }
`;

// ContentBottom
export const ContentBottom = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  margin-top: 10px;
  padding: 0 30px 20px;
  @media only screen and (max-width: 960px) {
    padding: 0 10px;
  }
  @media only screen and (max-width: 768px) {
    padding: 0;
  }
`;

export const OverView = styled.div`
  font-size: ${(props) => props.theme.fontSizePx.s};

  h5 {
    position: relative;
    margin-bottom: 10px;
    padding-left: 10px;
    font-weight: 600;
    color: ${(props) => props.theme.color.white.dark};
    :before {
      content: '';
      position: absolute;
      width: 2px;
      height: 10px;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background-color: ${(props) => props.theme.color.white.dark};
    }
  }
  p {
    line-height: 1.4;
    word-break: keep-all;
  }
`;

export const RatingUsers = styled.div`
  border-radius: 10px;
  background-color: ${(props) => props.theme.color.black.light};
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;
