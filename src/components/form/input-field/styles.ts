import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 400px;
  margin: 0 auto;
`;

export const InputRow = styled.div<{ isError: boolean }>`
  position: relative;
  background-color: white;
  padding: 27px 15px 8px;
  border-radius: 4px;
  border: ${(props) => (props.isError ? '1px solid red' : '1px solid transparent')};

  input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    cursor: pointer;
  }

  input:focus + label,
  input:not(:placeholder-shown) + label {
    bottom: 32px;
    font-size: 12px;
  }

  label {
    position: absolute;
    bottom: ${(props) => (props.isError ? '32px' : '18px')};
    left: 15px;
    color: rgba(0, 0, 0, 0.38);
    font-size: ${(props) => (props.isError ? '12px' : '16px')};
    transition: 0.3s;
    cursor: pointer;
  }

  .error {
    position: absolute;
    right: 15px;
    bottom: 32px;
    font-size: 12px;
    color: red;
  }
`;
