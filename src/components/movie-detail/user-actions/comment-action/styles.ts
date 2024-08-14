import styled from 'styled-components';

export const MyComment = styled.li`
  padding: 0 20px;

  h5 {
    height: 40px;
    padding-top: 6px;
    font-size: 14px;
    font-weight: 600;
    overflow: auto;
    white-space: pre-wrap;
    word-break: break-all;
    padding-bottom: 4px;

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
  }
`;

export const ButtonsBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 13px;
    margin-right: 14px;
    font-weight: 400;
  }

  button {
    position: relative;
    font-size: 13px;
    padding: 0 6px;
    font-weight: 300;
  }

  button:nth-of-type(1)::after {
    position: absolute;
    right: -1px;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 10px;
    background-color: ${(props) => props.theme.color.white.dark};
    content: '';
  }
`;
