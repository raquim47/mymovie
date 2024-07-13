import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Header = styled.header`
  display: none;

  @media (min-width: 961px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: sticky;
    top: 0;
    flex-shrink: 0;
    width: 240px;
    height: 100vh;
    padding: 24px 16px;
    background-color: ${(props) => props.theme.color.black.dark};
  }
`;

export const Nav = styled.nav`
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
