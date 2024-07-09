import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const Aside = styled.aside`
  position: sticky;
  top: 0;
  flex-shrink: 0;
  width: 240px;
  height: 100vh;
  padding: 24px 16px;
  background-color: ${(props) => props.theme.color.black.dark};
`;

export const Nav = styled.nav`
  padding-top: 20px;
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: ${(props) => props.theme.fontSizePx.s};

  &:hover {
    color: ${(props) => props.theme.color.white.normal};
  }

  svg {
    width: 20px;
    height: 20px;
  }

  &.active {
    color: ${(props) => props.theme.color.white.normal};
    background-color: ${(props) => props.theme.color.gray};
  }
`;

