import { Link } from 'react-router-dom';
import Styled from './styled';

const UserBrief = () => {
  return (
    <Styled.UserBrief>
      <img
        className="user-image"
        src={require('../../../assets/profile.png')}
        alt="유저 이미지"
      />

      <Styled.UserInfo>
        <h4>
          <Link to="profile">아이디아이디</Link>
        </h4>
        <Styled.UserMovieBrief>
          <h5>
            평가 : <Link to="/rate">0</Link>
          </h5>
          <h5>
            찜 : <Link to="/favorite">0</Link>
          </h5>
        </Styled.UserMovieBrief>
      </Styled.UserInfo>
    </Styled.UserBrief>
  );
};

export default UserBrief;
