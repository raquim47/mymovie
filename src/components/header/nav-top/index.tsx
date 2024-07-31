import { NavLink } from 'react-router-dom';
import PATH from 'utils/path';
import Logo from '../logo';
import SearchForm from '../search-form';
import AuthLink from './AuthLink';
import ST from './styles';

const NavTop = () => {
  return (
    <>
      <ST.Header>
        <Logo />
        <SearchForm />
        <AuthLink />
      </ST.Header>
      <ST.Nav>
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
      </ST.Nav>
    </>
  );
};

export default NavTop;
