import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  cursor: pointer;
`;

const LogoSvg = styled.svg`
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

const LogoText = styled.h1`
  font-size: ${props => props.theme.fontSizePx.xxl};
  font-weight: 800;
  @media only screen and (max-width: 960px) {
    font-size: ${props => props.theme.fontSizePx.l};
  }
`;

function Logo() {
  const navigate = useNavigate();
  return (
    <Wrapper onClick={() => navigate('/home')}>
      <LogoSvg
        xmlns='http://www.w3.org/2000/svg'
        width='1024'
        height='276.742'
        viewBox='0 0 239.58 219.65'
      >
        <defs>
          <linearGradient id='grad1' x1='0' x2='0' y1='0' y2='1'>
            <stop offset='0%' />
            <stop offset='50%' />
            <stop offset='100%' />
          </linearGradient>
        </defs>
        <path
          d='M200.64,177.56c.3,0,.61,0,.91,0A15.16,15.16,0,1,0,188,155.74c-21-28.23-64.84-35.79-64.84-35.79,50.1-15.58,57.26-59.79,55.15-62.32s-39-9.54-70.73,5.9c-32,15.58-76.21,80.21-57.27,110.31,16.34,26,58,3.87,69.21-2.71a1.2,1.2,0,0,1,1.72,1.47c-3.62,9.08-14,33.24-59.14,33.24-54.94,0-58.34-64.43-58.34-64.43q0-1.24,0-2.52A123.79,123.79,0,0,1,129.27,15.12c67.28,1,113.89,56.31,114,123.59.06,38.6-18.55,73.08-46.19,95.82a1,1,0,0,1-1.46-1.19C200.32,224.49,210.13,203.57,200.64,177.56Z'
          transform='translate(-3.68 -15.11)'
        />
        <path
          d='M75.63,164.37s-5.37-16,10.26-21.16C85.89,143.21,91.89,158.53,75.63,164.37Z'
          transform='translate(-3.68 -15.11)'
        />
      </LogoSvg>
      <LogoText>MYMOVIE</LogoText>
    </Wrapper>
  );
}

export default Logo;
