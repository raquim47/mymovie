import LogoutButton from 'components/logout';
import styled, { css } from 'styled-components';

const Header = styled.header`
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

const navItemStyles = css`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin-bottom: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  background-color: transparent;
  font-size: 14px;

  &:hover {
    color: ${(props) => props.theme.color.white.normal};
  }

  &:disabled {
    pointer-events: none;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const NavItem = styled.li`
  .logout,
  a {
    ${navItemStyles}
  }

  a.active {
    color: ${(props) => props.theme.color.white.normal};
    background-color: ${(props) => props.theme.color.gray};
  }
`;

const LogoutBtn = styled(LogoutButton)`
  ${navItemStyles}
`;

const ST = { Header, NavItem, LogoutBtn };
export default ST;
