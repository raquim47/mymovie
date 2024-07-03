import styled from "styled-components";

export const Figure = styled.figure`
  position: relative;
  margin-top: 12px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    object-fit: cover;
  }

  ::before {
    display: block;
    position: absolute;
    height: 100%;
    width: 100%;
    background-image: linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.8));
    content: '';
  }

  :hover::before {
    background-image: linear-gradient(
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.8)
    );
  }
`;

export  const Caption = styled.figcaption`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: absolute;
  bottom: 8%;
  width: 100%;
  padding: 0 6% 0 4%;

  h4 {
    font-size: ${(props) => props.theme.fontSizeVw['4xl']};
    font-weight: 600;
    color: ${(props) => props.theme.color.white.normal};

    @media (min-width: 769px) {
      font-size: ${(props) => props.theme.fontSizeVw['xxl']};
    }
    @media (min-width: 1201px) {
      font-size: ${(props) => props.theme.fontSizePx['4xl']};
    }
  }

  p {
    width: 100%;
    white-space: nowrap;
    font-size: ${(props) => props.theme.fontSizeVw['3xl']};
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (min-width: 769px) {
      font-size: ${(props) => props.theme.fontSizeVw.l};
    }
    @media (min-width: 961px) {
      font-size: 1.5vw;
    }
  }
`;