import { NavLink } from 'react-router-dom';
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
            <NavLink to="/">홈</NavLink>
          </li>
          <li>
            <NavLink to="/rated">평가한 영화</NavLink>
          </li>
          <li>
            <NavLink to="/favorite">찜한 영화</NavLink>
          </li>
        </ul>
      </ST.Nav>
    </>
  );
};

export default NavTop;
