import styled from 'styled-components';

const CommentForm = styled.form`
  display: flex;

  textarea {
    flex: 1;
    padding: 8px 16px;
    border-radius: 4px;
    box-sizing: border-box;
    outline: none;
    resize: none;
    ::placeholder {
      color: #a6adbd;
    }
  }
`;

const MyComment = styled.li`
  padding: 0 20px;

  p {
    height: 40px;
    font-size: 14px;
    font-weight: 300;
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

  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .buttons span {
    font-size: 13px;
    margin-right: 14px;
    font-weight: 400;
  }

  .buttons button {
    position: relative;
    font-size: 13px;
    padding: 0 6px;
    font-weight: 300;
  }

  .buttons button:nth-of-type(1)::after {
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

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: 10px;

  button {
    position: relative;
    background-color: transparent;
    font-size: 12px;
  }

  button:hover {
    color: ${(props) => props.theme.color.white.normal};
  }

  button:first-child::before {
    position: absolute;
    left: calc(100% + 3px);
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 60%;
    background-color: ${(props) => props.theme.color.white.dark};
    content: '';
  }
`;

export default { CommentForm, MyComment, Buttons };
