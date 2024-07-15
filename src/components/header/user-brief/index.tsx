import { useAppSelector } from 'hooks/useAppSelector';
import { Link } from 'react-router-dom';
import Styled from './styled';

const UserBrief = () => {
  const user = useAppSelector((state) => state.user.userData);
  return (
    <Styled.UserBrief>
      <img
        className="user-image"
        src={user?.photoUrl || require('../../../assets/profile.png')}
        alt="유저 이미지"
      />
      <Styled.UserInfo>
        <h4>
          <Link to="profile">{user?.nickName}</Link>
        </h4>
        <Styled.UserMovieBrief>
          <h5>
            평가 : <Link to="/rated">{user?.ratedMovies?.length || 0}</Link>
          </h5>
          <h5>
            찜 : <Link to="/favorite">{user?.likedMovies?.length || 0}</Link>
          </h5>
        </Styled.UserMovieBrief>
      </Styled.UserInfo>
    </Styled.UserBrief>
  );
};

export default UserBrief;
