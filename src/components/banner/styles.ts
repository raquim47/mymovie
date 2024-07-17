import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

const Link = styled(RouterLink)<{ bg: string }>`
  display: block;
  position: relative;
  margin-top: 12px;
  padding-top: 55%;
  border-radius: 4px;
  background: url(${(props) => props.bg}) no-repeat center center;
  background-size: cover;
  overflow: hidden;

  ::before {
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.8));
    content: '';
  }

  :hover::before {
    background-image: linear-gradient(rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.8));
  }
`;

const Caption = styled.div`
  position: absolute;
  width: 100%;
  bottom: 8%;
  padding: 0 6% 0 4%;
  h4 {
    margin-bottom: 8px;
    font-size: 6vw;
    font-weight: 600;
    color: ${(props) => props.theme.color.white.normal};

    @media (min-width: 769px) {
      font-size: 24px;
    }
    @media (min-width: 1201px) {
      font-size: 36px;
    }
  }

  p {
    font-size: 32px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    @media (min-width: 769px) {
      font-size: 2vw;
    }
    @media (min-width: 961px) {
      font-size: 1.5vw;
    }
  }
`;

const ST = { Link, Caption };
export default ST;
