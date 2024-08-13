import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../logo';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { faStar, faHeart } from '@fortawesome/free-regular-svg-icons';
import SearchForm from '../search-form';
import UserBrief from '../user-brief';
import { NavLink } from 'react-router-dom';
import AuthLink from './auth-link';
import * as S from './styles';
import PATH from 'utils/path';

const NavLeft = () => {
  return (
    <S.Header>
      <Logo />
      <UserBrief />
      <nav>
        <ul>
          <S.NavItem>
            <NavLink to={PATH.HOME}>
              <FontAwesomeIcon icon={faFilm} />홈
            </NavLink>
          </S.NavItem>
          <S.NavItem>
            <NavLink to={PATH.WATCHLIST}>
              <FontAwesomeIcon icon={faHeart} />
              찜한 영화
            </NavLink>
          </S.NavItem>
          <S.NavItem>
            <NavLink to={PATH.REVIEWED}>
              <FontAwesomeIcon icon={faStar} />
              평가한 영화
            </NavLink>
          </S.NavItem>
          <S.NavItem>
            <AuthLink />
          </S.NavItem>
          <S.NavItem>
            <SearchForm />
          </S.NavItem>
        </ul>
      </nav>
    </S.Header>
  );
};

export default NavLeft;
