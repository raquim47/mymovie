import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../logo';
import { faFilm, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faStar, faHeart } from '@fortawesome/free-regular-svg-icons';
import { Header, Nav, StyledNavLink } from './styled';
import SearchForm from '../search-form';
import { useAppSelector } from 'hooks/useAppSelector';
import LogoutBtn from '../logout-btn';
import UserBrief from '../user-brief';

const NAV_LINKS = [
  { to: '/', icon: faFilm, label: '홈' },
  { to: '/rate', icon: faStar, label: '평가한 영화' },
  { to: '/favorite', icon: faHeart, label: '찜한 영화' },
];

const NavLeft = () => {
  const user = useAppSelector((state) => state.user.userData);
  return (
    <Header>
      <Logo />
      {user && <UserBrief />}
      <Nav>
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <StyledNavLink to={link.to}>
                <FontAwesomeIcon icon={link.icon} />
                {link.label}
              </StyledNavLink>
            </li>
          ))}
          <li>
            {user ? (
              <LogoutBtn />
            ) : (
              <StyledNavLink to="/login">
                <FontAwesomeIcon icon={faRightToBracket} />
                로그인
              </StyledNavLink>
            )}
          </li>
          <li>
            <SearchForm />
          </li>
        </ul>
      </Nav>
    </Header>
  );
};

export default NavLeft;
