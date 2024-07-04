import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 250px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.gray};
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 20px;
`;

export const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  color: white;
  font-size: 14px;
  background-color: ${(props) => props.theme.color.gray};
`;

export const Button = styled.button`
  color: ${(props) => props.theme.color.white.dark};
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.color.white.normal};
  }
`;