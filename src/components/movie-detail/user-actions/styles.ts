import styled from 'styled-components';

const Actions = styled.section`
  padding: 16px;
  background-color: ${(state) => state.theme.color.black.dark};

  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 0 -16px;
  }

  li {
    text-align: center;
  }

  li button {
    margin: 0 auto;
    white-space: nowrap;
    height: 40px;
    font-size: 24px;
  }

  li button.heart {
    color: ${(props) => props.theme.color.purple.normal};
  }

  li span {
    display: block;
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
`;

const ST = { Actions };
export default ST;
