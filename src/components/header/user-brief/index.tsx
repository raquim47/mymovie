import { useAppSelector } from 'hooks/useAppSelector';
import { Link } from 'react-router-dom';
import ST from './styles';

const UserBrief = () => {
  const user = useAppSelector((state) => state.user.userData);
  if (!user) return null;

  const ratedMoviesCount = user?.ratedMovies ? Object.keys(user.ratedMovies).length : 0;
  const watchListCount = user?.watchList ? Object.keys(user.watchList).length : 0;
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
            평가 : <Link to="/rated">{ratedMoviesCount}</Link>
          </h5>
          <h5>
            찜 : <Link to="/watchlist">{watchListCount}</Link>
          </h5>
        </ST.UserMovieBrief>
      </ST.UserInfo>
    </ST.UserBrief>
  );
};

export default UserBrief;
