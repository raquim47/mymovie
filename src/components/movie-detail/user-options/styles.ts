import styled from 'styled-components';

const Options = styled.section`
  padding: 16px;
  background-color: ${(state) => state.theme.color.black.dark};

  ul {
    display: flex;
    justify-content: space-between;
    margin: 0 -16px;
  }

  li {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 13px;
    font-weight: 300;
  }

  li ~ li {
    position: relative;

    ::before {
      position: absolute;
      top: 50%;
      right: 100%;
      transform: translateY(-50%);
      width: 1px;
      height: 80%;
      background-color: ${(props) => props.theme.color.white.dark};
      content: '';
    }
  }

  .option-btn {
    margin: 0 auto;
    white-space: nowrap;
    height: 40px;
    font-size: 24px;
  }
`;

const ST = { Options };
export default ST;
