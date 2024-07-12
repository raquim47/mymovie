import styled from "styled-components";

export const Btn = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  width: 100%;
  border: none;
  background-color: transparent;
  font-size: ${(props) => props.theme.fontSizePx.s};

  &:hover {
    color: ${(props) => props.theme.color.white.normal};
  }
  
  &:disabled:hover {
    color: ${(props) => props.theme.color.white.dark};
    cursor: default;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;