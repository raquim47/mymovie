import styled from 'styled-components';

const Overay = styled.div`
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

const Inner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;

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

  @media (min-width: 769px) {
    width: 80%;
    height: auto;
    min-height: 300px;
    max-height: 80%;
    border-radius: 10px;
  }

  @media (min-width: 961px) {
    width: 70%;
    max-width: 800px;
    border-radius: 10px;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 14px;
  transition: transform 0.3s ease-in-out;
  color: ${(props) => props.theme.color.white.dark};
  z-index: 100;

  &:hover {
    transform: scale(1.2);
    color: ${(props) => props.theme.color.white.normal};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const ST = { Overay, Inner, CloseBtn };
export default ST;
