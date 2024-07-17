import { useAppSelector } from 'hooks/useAppSelector';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../logo';
import SearchForm from '../search-form';
import ST from './styles';

const NavTop = () => {
  const user = useAppSelector((state) => state.user.userData);
  return (
    <>
      <ST.Header>
        <Logo />
        <SearchForm />
        {user ? (
          <Link to="profile">
            <img
              className="user-image"
              src={require('../../../assets/profile.png')}
              alt="유저 이미지"
            />
          </Link>
        ) : (
          <Link to="/login" className="login-link">
            로그인
          </Link>
        )}
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
