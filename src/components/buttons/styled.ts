import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const buttonStyles = css`
  width: 100%;
  margin-bottom: 12px;
  padding: 12px 0;
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.gray};
  color: ${(props) => props.theme.color.white.normal};
  font-size: 16px;
  text-align: center;

  :hover {
    background-color: ${(props) => props.theme.color.purple.dark};
  }

  :disabled {
    background-color: ${(props) => props.theme.color.gray};
    pointer-events: none;
  }
`;

const DefaultButton = styled.button<{ accent: boolean }>`
  ${buttonStyles}
  background-color: ${(props) =>
    props.accent ? props.theme.color.purple.normal : props.theme.color.gray};
`;

const LinkButton = styled(Link)`
  ${buttonStyles}
  display: inline-block;
`;

export default { DefaultButton, LinkButton };
