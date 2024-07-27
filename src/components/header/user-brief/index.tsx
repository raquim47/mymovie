import { useAppSelector } from 'hooks/useAppSelector';
import { Link } from 'react-router-dom';
import ST from './styles';

const UserBrief = () => {
  const user = useAppSelector((state) => state.user.userData);
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
          <Link to="profile">{user?.nickName}</Link>
        </h4>
        <ST.UserMovieBrief>
          <h5>
            평가 : <Link to="/rated">{Object.keys(user.ratedMovies || {}).length}</Link>
          </h5>
          <h5>
            찜 : <Link to="/watchlist">{Object.keys(user.watchList || {}).length}</Link>
          </h5>
        </ST.UserMovieBrief>
      </ST.UserInfo>
    </ST.UserBrief>
  );
};

export default UserBrief;
