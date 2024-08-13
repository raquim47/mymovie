import { NavLink } from 'react-router-dom';
import PATH from 'utils/path';
import Logo from '../logo';
import SearchForm from '../search-form';
import AuthLink from './auth-link';
import * as S from './styles';

const NavTop = () => {
  return (
    <>
      <S.Header>
        <Logo />
        <SearchForm />
        <S.AuthLinkBlock>
          <AuthLink />
        </S.AuthLinkBlock>
      </S.Header>
      <S.Nav>
        <ul>
          <li>
            <NavLink to={PATH.HOME}>홈</NavLink>
          </li>
          <li>
            <NavLink to={PATH.WATCHLIST}>찜한 영화</NavLink>
          </li>
          <li>
            <NavLink to={PATH.REVIEWED}>평가한 영화</NavLink>
          </li>
        </ul>
      </S.Nav>
    </>
  );
};

export default NavTop;
