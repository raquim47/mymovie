import { Link } from 'react-router-dom';
import * as S from './styles';
import PATH from 'utils/path';
import useCurrentUser from 'hooks/useCurrentUser';
import ProfileImage from 'components/profile/profile-image';

const UserBrief = () => {
  const { user } = useCurrentUser();
  if (!user) return null;

  return (
    <S.UserBriefBlock>
      <ProfileImage imageUrl={user.photoUrl} name={user.nickName} />
      <S.UserInfo>
        <h4>
          <Link to={PATH.PROFILE}>{user?.nickName}</Link>
        </h4>
        <S.UserMovieBrief>
          <h5>
            평가 :{' '}
            <Link to={PATH.REVIEWED}>{Object.keys(user.reviewed || {}).length}</Link>
          </h5>
          <h5>
            찜 :{' '}
            <Link to={PATH.WATCHLIST}>{Object.keys(user.watchList || {}).length}</Link>
          </h5>
        </S.UserMovieBrief>
      </S.UserInfo>
    </S.UserBriefBlock>
  );
};

export default UserBrief;
