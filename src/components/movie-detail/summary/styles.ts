import styled from 'styled-components';

export const SummaryBlock = styled.section`
  padding: 16px;
  background-color: ${(state) => state.theme.color.black.dark};

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
