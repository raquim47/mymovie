import styled from 'styled-components';

export const ErrorMessage = styled.p`
  font-size: 12px;
  color: ${(props) => props.theme.color.red};
  font-weight: 500;
  word-break: break-all;
`;
