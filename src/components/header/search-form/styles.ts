import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 250px;
  padding: 10px 12px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.gray};
`;

export const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background-color: ${(props) => props.theme.color.gray};
  font-size: 14px;
  color: ${(props) => props.theme.color.white.dark};
`;

export const Button = styled.button`
  padding: 0;

  &:hover {
    color: ${(props) => props.theme.color.white.normal};
  }
`;
