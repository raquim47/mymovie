import styled from 'styled-components';
import Logo from './Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faStar, faHeart } from '@fortawesome/free-regular-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm';

const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 25px;
  position: fixed;
  width: 240px;
  height: 100%;
  top: 0;
  left: 0;
  padding: 24px 16px;
  background-color: ${(props) => props.theme.black.darker};
  border-right: 1px solid ${(props) => props.theme.black.borderBlack};
  z-index: 100;

  a:first-child {
    margin-left: 12px;
  }
`;

const NavItem = styled.li<{ isClicked?: boolean | null }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${(props) => props.isClicked && props.theme.gray};
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
  }

  span {
    color: ${(props) =>
      props.isClicked ? props.theme.white.white : props.theme.white.darker};
  }

  &:hover span {
    color: ${(props) => props.theme.white.white};
  }
`;

const NavItemSearch = styled(NavItem)`
  padding: 0;
`;

function Nav() {
  const navDataArr = [
    { name: '홈', url: 'home', icon: faFilm },
    { name: '평가한 영화', url: 'rate', icon: faStar },
    { name: '보고 싶은 영화', url: 'library', icon: faHeart },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const onClickNavItem = (url: string) => () => navigate(`/${url}`);
  return (
    <Wrapper>
      <Link to="/home">
        <Logo />
      </Link>
      <ul>
        {navDataArr.map((item) => (
          <NavItem
            key={item.url}
            isClicked={location.pathname === `/${item.url}`}
            onClick={onClickNavItem(item.url)}
          >
            <FontAwesomeIcon icon={item.icon} />
            <span>{item.name}</span>
          </NavItem>
        ))}
        <NavItemSearch>
          <SearchForm />
        </NavItemSearch>
      </ul>
    </Wrapper>
  );
}

export default Nav;
