import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 30px;
  max-width: 400px;
  margin: 100px auto 0;
`;

const LeftSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 180px;
  padding-right: 30px;
  border-right: 1px solid ${(props) => props.theme.color.gray};

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin: 0 auto;
    border-radius: 50%;
  }

  .edit-photo input {
    display: none;
  }
`;

const RightSection = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;

  .email {
    margin-bottom: 20px;
    font-size: 14px;
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
  Container,
  LeftSection,
  RightSection,
  NickName,
  NickNameForm,
};
