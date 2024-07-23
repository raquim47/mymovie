import { useAppSelector } from 'hooks/useAppSelector';
import { Link } from 'react-router-dom';
import ST from './styles';

const AuthLink = () => {
  const user = useAppSelector((state) => state.user.userData);
  return (
    <ST.AuthLink>
      {user === null && <Link to="/login">로그인</Link>}
      {user && (
        <Link to="/profile">
          <img src={require('assets/profile.png')} alt="유저 이미지" />
        </Link>
      )}
    </ST.AuthLink>
  );
};

export default AuthLink;
