import { Link } from 'react-router-dom';
import PATH from 'utils/path';
import useCurrentUser from 'hooks/useCurrentUser';
import ProfileImage from 'components/profile/profile-image';

const AuthLink = () => {
  const { user, isLoading } = useCurrentUser();

  if (!isLoading && !user) return <Link to={PATH.LOGIN}>로그인</Link>;

  if (!isLoading && user)
    return (
      <Link to={PATH.PROFILE}>
        <ProfileImage imageUrl={user.photoUrl} name={user.nickName} />
      </Link>
    );

  return null;
};

export default AuthLink;
