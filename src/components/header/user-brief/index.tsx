import { Link } from 'react-router-dom';
import ST from './styles';
import PATH from 'utils/path';
import useGetUser from 'hooks/users/useGetUser';

const UserBrief = () => {
  const { user } = useGetUser();
  if (!user) return null;

  return (
    <ST.UserBrief>
      <img
        className="user-image"
        src={user?.photoUrl || require('assets/profile.png')}
        alt="유저 이미지"
      />
      <ST.UserInfo>
        <h4>
          <Link to={PATH.PROFILE}>{user?.nickName}</Link>
        </h4>
        <ST.UserMovieBrief>
          <h5>
            평가 :{' '}
            <Link to={PATH.REVIEWED}>{Object.keys(user.reviewed || {}).length}</Link>
          </h5>
          <h5>
            찜 :{' '}
            <Link to={PATH.WATCHLIST}>{Object.keys(user.watchList || {}).length}</Link>
          </h5>
        </ST.UserMovieBrief>
      </ST.UserInfo>
    </ST.UserBrief>
  );
};

export default UserBrief;
