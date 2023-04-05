import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  padding: 12px;
  border-top: 1px solid ${(props) => props.theme.color.gray};
  border-bottom: 1px solid ${(props) => props.theme.color.gray};
`;

const UserImg = styled.div`
  width: 60px;
  height: 60px;
  overflow: hidden;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserInfo = styled.div`
  margin-top: 5px;
  h4 {
    font-size: ${props => props.theme.fontSizePx.s};
    font-weight: 400;
  }
`;

const UserMovie = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 6px;
  font-size: 13px;

  small {
    margin-left: 4px;
    text-decoration: underline;
  }
`;

const UserEdit = styled.div`
  position: absolute;
  right: 0;
  top: 4px;
  font-size: ${props => props.theme.fontSizePx.xs};
  cursor: pointer;

  :hover {
    color: ${(props) => props.theme.color.white.normal};
    transform: rotate(50%);
  }
`;

function UserMiniProfile() {
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.userData);
  return (
    <Wrapper>
      <UserEdit onClick={() => navigate('/profile')}>
        <FontAwesomeIcon icon={faGear} />
      </UserEdit>
      <UserImg>
        <img
          src={
            userData?.userPhoto
              ? userData.userPhoto
              : require('../../assets/profile.png')
          }
          alt="유저 이미지"
        />
      </UserImg>
      <UserInfo>
        <h4>{userData?.nickName}</h4>
        <UserMovie>
          <span>
            평가
            <small>
              {userData?.ratedMovies ? Object.keys(userData?.ratedMovies).length : 0}
            </small>
          </span>
          <span>
            찜
            <small>
              {userData?.favoriteMovies ? Object.keys(userData?.favoriteMovies).length : 0}
            </small>
          </span>
        </UserMovie>
      </UserInfo>
    </Wrapper>
  );
}
export default UserMiniProfile;
