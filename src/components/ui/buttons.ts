import { Link as RouterLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const buttonStyles = css`
  width: 100%;
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

const Base = styled.button<{ accent?: boolean }>`
  ${buttonStyles}
  background-color: ${(props) =>
    props.accent ? props.theme.color.purple.normal : props.theme.color.gray};
`;

const Link = styled(RouterLink)`
  ${buttonStyles}
  display: inline-block;
`;

const Label = styled.label`
  ${buttonStyles}
  display: block;
  cursor: pointer;

  &.disabled {
    pointer-events: none;
  }
`;

const Buttons = { Base, Link, Label };
export default Buttons;
