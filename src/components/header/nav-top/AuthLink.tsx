import { Link } from 'react-router-dom';
import ST from './styles';
import PATH from 'utils/path';
import useGetUser from 'hooks/users/useGetUser';
import ProfileImage from 'components/profile/profile-image';

const AuthLink = () => {
  const { user, isLoading } = useGetUser();
  return (
    <ST.AuthLink>
      {!isLoading && !user && <Link to={PATH.LOGIN}>로그인</Link>}
      {!isLoading && user && (
        <Link to={PATH.PROFILE}>
          <ProfileImage imageUrl={user.photoUrl} name={user.nickName} />
        </Link>
      )}
    </ST.AuthLink>
  );
};

export default AuthLink;
