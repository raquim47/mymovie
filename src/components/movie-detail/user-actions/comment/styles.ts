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
`
export default { CommentForm,Buttons };
