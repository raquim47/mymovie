import styled from 'styled-components';

const EditImage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin: 0 auto 10px;
    border-radius: 50%;
  }

  input {
    display: none;
  }
`;

const NickName = styled.div`
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

const NickNameForm = styled.form`
  flex: 1;

  input {
    width: 100%;
    padding: 10px;
    outline: none;
    border: none;
    border-radius: 4px;
  }

  .buttons {
    margin-top: 14px;

    button[type='button'] {
      color: ${(props) => props.theme.color.white.dark};
      text-decoration: underline;
    }

    button[type='submit'] {
      color: ${(props) => props.theme.color.purple.normal};
      text-decoration: underline;
    }
  }
`;

export default {
  EditImage,
  NickName,
  NickNameForm,
};
