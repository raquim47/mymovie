import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 14px;
  position: sticky;
  top: 0;
  padding: 16px 30px;
  z-index: ${(props) => props.theme.zIndex.topMenu};
  background-color: ${(props) => props.theme.color.black.normal};
  background-color: black;

  .user-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid ${(props) => props.theme.color.gray};
  }

  .login-link {
    font-size: 14px;
    color: ${(props) => props.theme.color.white.dark};

    &:hover {
      color: ${(props) => props.theme.color.white.normal};
    }
  }

  @media (min-width: 961px) {
    display: none;
  }
`;

const Nav = styled.nav`
  padding: 10px 30px 0;

  ul {
    display: flex;
    border-bottom: 1px solid ${(props) => props.theme.color.gray};
    padding-bottom: 5px;
    gap: 25px;
  }

  li {
    position: relative;

    &::before {
      position: absolute;
      left: calc(100% + 12px);
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 60%;
      background-color: ${(props) => props.theme.color.gray};
      content: '';
    }

    &:last-child::before {
      content: none;
    }
  }

  a {
    font-size: 24px;
    color: ${(props) => props.theme.color.gray};
    font-weight: 600;

    &:hover,
    &.active {
      color: ${(props) => props.theme.color.white.dark};
    }
  }
`;

export default { Header, Nav };
