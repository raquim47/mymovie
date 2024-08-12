import styled from 'styled-components';

export const NickName = styled.div`
  flex: 1;

  h2 {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 6px;
    white-space: nowrap;
  }

  button {
    color: ${(props) => props.theme.color.purple.normal};
    font-size: 14px;
    font-weight: 500;
    text-decoration: underline;
  }
`;

export const NickNameForm = styled.form`
  flex: 1;

  input {
    width: 100%;
    padding: 10px;
    outline: none;
    border: none;
    border-radius: 4px;
  }

  p {
    margin-top: 6px;
    font-size: 12px;
    color: #f05650;
    word-break: break-all;
  }
`;

export const NickNameButtons = styled.div`
  margin-top: 14px;

  button[type='button'] {
    color: ${(props) => props.theme.color.white.dark};
    text-decoration: underline;
  }

  button[type='submit'] {
    color: ${(props) => props.theme.color.purple.normal};
    text-decoration: underline;
  }
`;
