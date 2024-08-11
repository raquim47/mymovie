import { Link } from 'react-router-dom';
import ST from './styles';
import PATH from 'utils/path';
import useGetUser from 'hooks/users/useGetUser';

const AuthLink = () => {
  const { user, isLoading } = useGetUser();
  return (
    <ST.AuthLink>
      {!isLoading && !user && <Link to={PATH.LOGIN}>로그인</Link>}
      {!isLoading && user && (
        <Link to={PATH.PROFILE}>
          <img src={require('assets/profile.png')} alt="유저 이미지" />
        </Link>
      )}
    </ST.AuthLink>
  );
};

export default AuthLink;
