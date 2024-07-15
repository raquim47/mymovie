import { useAppSelector } from 'hooks/useAppSelector';
import { Link } from 'react-router-dom';
import Logo from '../logo';
import SearchForm from '../search-form';
import Styled from './styled';

const NavTop = () => {
  const user = useAppSelector((state) => state.user.userData);
  return (
    <>
      <Styled.Header>
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
          <Link to="/login" className='login-link'>로그인</Link>
        )}
      </Styled.Header>
      <Styled.Nav>
        <ul>
          <li>
            <Styled.CustomNavLink to="/">홈</Styled.CustomNavLink>
          </li>
          <li>
            <Styled.CustomNavLink to="/rated">평가한 영화</Styled.CustomNavLink>
          </li>
          <li>
            <Styled.CustomNavLink to="/favorite">찜한 영화</Styled.CustomNavLink>
          </li>
        </ul>
      </Styled.Nav>
    </>
  );
};

export default NavTop;
