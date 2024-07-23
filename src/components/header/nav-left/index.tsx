import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../logo';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { faStar, faHeart } from '@fortawesome/free-regular-svg-icons';
import SearchForm from '../search-form';
import UserBrief from '../user-brief';
import { NavLink } from 'react-router-dom';
import AuthAction from './AuthAction';
import ST from './styles';

const NavLeft = () => {
  return (
    <ST.Header>
      <Logo />
      <UserBrief />
      <nav>
        <ul>
          <ST.NavItem>
            <NavLink to="/">
              <FontAwesomeIcon icon={faFilm} />홈
            </NavLink>
          </ST.NavItem>
          <ST.NavItem>
            <NavLink to="/rated">
              <FontAwesomeIcon icon={faStar} />
              평가한 영화
            </NavLink>
          </ST.NavItem>
          <ST.NavItem>
            <NavLink to="/favorite">
              <FontAwesomeIcon icon={faHeart} />
              찜한 영화
            </NavLink>
          </ST.NavItem>
          <AuthAction />
          <ST.NavItem>
            <SearchForm />
          </ST.NavItem>
        </ul>
      </nav>
    </ST.Header>
  );
};

export default NavLeft;
