import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../logo';
import {
  faFilm,
  faRightToBracket,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faStar, faHeart } from '@fortawesome/free-regular-svg-icons';
import { Aside, Nav, StyledNavLink } from './styled';
import SearchForm from '../search-form';

const NAV_LINKS = [
  { to: "/", icon: faFilm, label: "홈" },
  { to: "/rate", icon: faStar, label: "평가한 영화" },
  { to: "/favorite", icon: faHeart, label: "찜한 영화" },
  { to: "/auth", icon: faRightToBracket, label: "로그인" },
];

const NavLeft = () => {
  return (
    <Aside>
      <Logo />
      <Nav>
        <ul>
          <li>
            <StyledNavLink to="/">
              <FontAwesomeIcon icon={faFilm} />홈
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/rate">
              <FontAwesomeIcon icon={faStar} />
              평가한 영화
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/favorite">
              <FontAwesomeIcon icon={faHeart} />
              찜한 영화
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/auth">
              <FontAwesomeIcon icon={faRightToBracket} />
              로그인
            </StyledNavLink>
          </li>
          <li>
            <SearchForm />
          </li>
        </ul>
      </Nav>
    </Aside>
  );
};

export default NavLeft;
