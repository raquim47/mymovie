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
  z-index: 100;
`;

export const Wrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 70vw;
  max-width: 900px;
  height: 75vh;
  margin: auto;
  overflow: hidden;
  padding-bottom: 30px;
  border-radius: 25px;
  background-color: ${(props) => props.theme.black.lighter};
  z-index: 100;

  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  .closeBtn {
    position: absolute;
    top: 16px;
    right: 20px;
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

export const Content = styled(motion.div)`
  position: relative;
  height: 100%;
  color: ${(props) => props.theme.white.white};
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
// ContentTop
export const ContentTop = styled.section`
  position: relative;
  height: 380px;

  @media only screen and (max-width: 768px) {
    height: auto;
    margin-bottom: 10px;
  }
`;

export const ContentTopBg = styled.div<{ $bgPhoto: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;

  @media only screen and (max-width: 768px) {
    position: relative;
    height: 350px;
  }
`;

export const ContentTopInner = styled.div`
  position: absolute;
  bottom: -85px;
  width: 100%;
  padding-left: calc(30% + 40px);
  padding-right: 30px;

  @media only screen and (max-width: 960px) {
    padding-left: 30px;
  }

  @media only screen and (max-width: 768px) {
    position: relative;
    bottom: 0;
    padding: 10px 20px 0;
  }
`;

export const DetailPoster = styled.div`
  position: absolute;
  left: 30px;
  bottom: 0;
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
    bottom: 95px;
    width: 20%;
  }

  @media only screen and (max-width: 768px) {
    right: 50%;
    transform: translateX(50%);
    min-width: 120px;
    bottom: calc(100% + 30px);
  }
`;

// ContentMiddle
export const ContentMiddle = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  margin-top: 95px;
  padding: 0 30px 20px;

  @media only screen and (max-width: 768px) {
    margin-top: 0;
    padding: 0 20px 20px;
  }
`;


export const OverView = styled.div`
  border-radius: 4px;
  padding: 16px;
  background-color: ${(props) => props.theme.black.middle};

  h5 {
    position: relative;
    margin-bottom: 10px;
    padding-left: 10px;
    font-size: 14px;
    font-weight: 600;
    color: ${(props) => props.theme.white.darker};
    :before {
      content: '';
      position: absolute;
      width: 2px;
      height: 10px;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background-color: ${(props) => props.theme.white.darker};
    }
  }
  p {
    font-size: 14px;
    line-height: 1.4;
    word-break: keep-all;
  }
`;

export const Ratings = styled.div`
  border-radius: 4px;
  padding: 16px;
  background-color: ${(props) => props.theme.black.middle};
`;
export const UserItemWrapper = styled.div`
  border-radius: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;
