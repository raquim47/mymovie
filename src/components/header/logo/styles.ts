import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

const Link = styled(RouterLink)`
  display: flex;
  align-items: flex-end;
  gap: 10px;
`;

const Svg = styled.svg`
  width: 50px;
  height: 50px;
  fill: url(#grad1);
  margin-left: 15px;

  @media only screen and (max-width: 960px) {
    margin-left: 0;
    width: 35px;
    height: 35px;
  }
  linearGradient {
    stop:nth-child(1) {
      stop-color: RGB(193, 107, 213);
      stop-opacity: 1;
    }
    stop:nth-child(2) {
      stop-color: RGB(116, 67, 192);
      stop-opacity: 1;
    }
    stop:nth-child(3) {
      stop-color: RGB(49, 35, 171);
      stop-opacity: 1;
    }
  }
`;

const Text = styled.h1`
  font-size: ${(props) => props.theme.fontSizePx.xxl};
  font-weight: 800;
  @media only screen and (max-width: 960px) {
    font-size: ${(props) => props.theme.fontSizePx.l};
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

export default { Link, Svg, Text };
