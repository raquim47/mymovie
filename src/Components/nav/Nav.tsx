import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilm,
  faRightToBracket,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faStar, faHeart } from '@fortawesome/free-regular-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { auth } from '../../services/fbaseInit';
import {UserMiniProfile, SearchForm, Logo} from '../components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const NavList = styled.ul``;

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
  const { isLoggedIn } = useSelector((state: RootState) => state.init);
  const navDataArr = [
    { name: '홈', url: 'home', icon: faFilm },
    { name: '평가한 영화', url: 'rate', icon: faStar },
    { name: '보고 싶은 영화', url: 'library', icon: faHeart },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const onClickNavItem = (url: string) => () => navigate(`/${url}`);
  const onLogOutClick = () => {
    const confirmLogout = window.confirm('로그아웃 하시겠습니까?');
    if (confirmLogout) {
      auth.signOut();
      navigate('/home');
    }
  };
  return (
    <Wrapper>
      <Link to="/home">
        <Logo />
      </Link>
      {isLoggedIn ? <UserMiniProfile /> : null}
      <NavList>
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
        {!isLoggedIn ? (
          <NavItem
            isClicked={location.pathname === `/auth`}
            onClick={onClickNavItem('auth')}
          >
            <FontAwesomeIcon icon={faRightToBracket} />
            <span>로그인</span>
          </NavItem>
        ) : (
          <div>
            <NavItem
              isClicked={location.pathname === `/auth`}
              onClick={onLogOutClick}
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span>로그아웃</span>
            </NavItem>
          </div>
        )}
        <NavItemSearch>
          <SearchForm />
        </NavItemSearch>
      </NavList>
    </Wrapper>
  );
}

export default Nav;
