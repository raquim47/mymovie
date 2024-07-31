import { useAppSelector } from 'store';
import { Link } from 'react-router-dom';
import ST from './styles';
import PATH from 'utils/path';

const AuthLink = () => {
  const user = useAppSelector((state) => state.user.userData);
  return (
    <ST.AuthLink>
      {user === null && <Link to={PATH.LOGIN}>로그인</Link>}
      {user && (
        <Link to={PATH.PROFILE}>
          <img src={require('assets/profile.png')} alt="유저 이미지" />
        </Link>
      )}
    </ST.AuthLink>
  );
};

export default AuthLink;
