import styled, { css } from 'styled-components';

const Content = styled.article`
  height: 100%;
  padding-bottom: 10px;
  background-color: ${(props) => props.theme.color.gray};
`;

const Top = styled.div`
  position: relative;
  margin-bottom: 10px;

  .backdrop {
    height: 330px;
    filter: brightness(0.7);
  }
`;

const boxStyles = css`
  padding: 16px;
  background-color: ${(state) => state.theme.color.black.dark};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: absolute;
  left: 0;
  bottom: 20px;
  width: 100%;
  padding: 0 30px;
  gap: 20px;

  .poster {
    flex-shrink: 0;
    position: relative;
    transform: translateX(0);
    width: 160px;
    height: 240px;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    ${boxStyles}
    position: relative;
    margin-top: 10px;
    bottom: 0;

    .poster {
      position: absolute;
      left: 50%;
      bottom: calc(100% + 50px);
      transform: translateX(-50%);
      width: 100px;
      height: 140px;
    }
  }

  @media (max-width: 1024px) {
    .poster {
      width: 140px;
      height: 210px;
    }
  }
`;

const Info = styled.div`
  color: ${(state) => state.theme.color.white.normal};

  h2 {
    font-size: 36px;
    font-weight: 700;
  }

  h3 {
    margin: 4px 0 10px;
    font-size: 20px;
  }

  ul {
    display: flex;
  }

  li {
    position: relative;
    font-size: 14px;
    font-weight: 300;

    &.genres {
      display: flex;
      gap: 6px;
    }
  }

  li ~ li {
    padding-left: 15px;
    margin-left: 12px;
  }

  li ~ li:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.color.white.dark};
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Summary = styled.section`
  ${boxStyles}

  h4 {
    position: relative;
    margin-bottom: 10px;
    padding-left: 10px;
    font-size: 16px;

    :before {
      content: '';
      position: absolute;
      width: 3px;
      height: 70%;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background-color: ${(props) => props.theme.color.white.dark};
    }
  }

  p {
    font-size: 14px;
    font-weight: 300;
    line-height: 1.4;
  }
`;

const ST = { Content, Top, Header, Info, Bottom, Summary };
export default ST;
