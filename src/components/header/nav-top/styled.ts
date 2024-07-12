import styled from 'styled-components';

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr auto auto ;
  gap: 14px;
  position: sticky;
  top: 0;
  padding: 16px 30px;
  z-index: ${(props) => props.theme.zIndex.topMenu};
  background-color: ${(props) => props.theme.color.black.normal};
  background-color: black;

  @media (min-width: 961px) {
    display: none;
  }
`;

const Nav = styled.nav``;

export default { Header, Nav };
