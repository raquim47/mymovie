import styled from 'styled-components';

const Form = styled.form`
  margin: 0 auto;
  max-width: 400px;
  padding-top: 10px;

  h2 {
    font-size: 28px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 20px;
  }

  button {
    margin-bottom: 12px;
  }
`;

const Field = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 22px;
  margin-bottom: 6px;

  label {
    margin-bottom: 4px;
    font-size: 12px;
    font-weight: 500;
    color: ${(props) => props.theme.color.white.dark};
  }

  input {
    height: 38px;
    padding: 0 16px;
    border-radius: 4px;
    font-size: 14px;
    border: none;
    outline: none;

    ::placeholder {
      color: #a6adbd;
    }
  }
`;

const ErrorMassage = styled.p`
  position: absolute;
  bottom: 4px;
  color: ${(props) => props.theme.color.purple.normal};
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
`;

export default { Form, Field, ErrorMassage };
