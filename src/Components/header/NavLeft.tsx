import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilm,
  faRightToBracket,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faStar, faHeart } from '@fortawesome/free-regular-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../services/fbaseInit';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Logo from './Logo';
import UserMiniProfile from './UserMiniProfile';
import SearchForm from './SearchForm';

const Wrapper = styled.nav`
  display: none;
  flex-direction: column;
  gap: 20px;
  position: fixed;
  width: 240px;
  height: 100%;
  top: 0;
  left: 0;
  padding: 24px 16px;
  background-color: ${(props) => props.theme.color.black.dark};

  a:first-child {
    margin-left: 12px;
  }

  @media (min-width: 961px) {
    display: flex; // 961px 이상에서만 표시
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
  background-color: ${(props) => props.isClicked && props.theme.color.gray};
  font-size: ${(props) => props.theme.fontSizePx.s};
  font-weight: 400;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
  }

  span {
    color: ${(props) =>
      props.isClicked
        ? props.theme.color.white.normal
        : props.theme.color.white.dark};
  }

  &:hover span {
    color: ${(props) => props.theme.color.white.normal};
  }
`;

const NavItemSearch = styled(NavItem)`
  padding: 0;
`;

function NavLeft() {
  const { isLoggedIn } = useSelector((state: RootState) => state.init);
  const navDataArr = [
    { name: '홈', url: 'home', icon: faFilm },
    { name: '평가한 영화', url: 'rate', icon: faStar },
    { name: '찜한 영화', url: 'favorite', icon: faHeart },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const onClickNavItem = (url: string) => () => navigate(`/${url}`);
  const onClickLogOut = () => {
    const confirmLogout = window.confirm('로그아웃 하시겠습니까?');
    if (confirmLogout) {
      auth.signOut();
      navigate('/home');
    }
  };
  return (
    <Wrapper>
      <Logo />
      {isLoggedIn ? <UserMiniProfile /> : null}
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
              onClick={onClickLogOut}
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span>로그아웃</span>
            </NavItem>
          </div>
        )}
        <NavItemSearch>
          <SearchForm />
        </NavItemSearch>
      </ul>
    </Wrapper>
  );
}

export default NavLeft;
