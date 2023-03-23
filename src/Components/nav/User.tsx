import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  position: relative;
  background-color: ${(props) => props.theme.gray};
  padding: 12px;
  border-radius: 8px;
`;

const UserImg = styled.div`
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserInfo = styled.div`
  h4 {
    font-size: 15px;
    font-weight: 500;
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
  right: 10px;
  top: 8px;
  font-size: 13px;
  cursor: pointer;

  :hover {
    color: ${(props) => props.theme.white.white};
    transform: rotate(50%);
  }
`;

function User() {
  const nickName = useSelector(
    (state: RootState) => state.user.userData.nickName
  );
  return (
    <Wrapper>
      <UserEdit>
        <FontAwesomeIcon icon={faGear} />
      </UserEdit>
      <UserImg>
        <img src={require('../../assets/profile.png')} alt="유저 이미지" />
      </UserImg>
      <UserInfo>
        <h4>{nickName}</h4>
        <UserMovie>
          <span>
            평가<small>0</small>
          </span>
          <span>
            찜<small>0</small>
          </span>
        </UserMovie>
      </UserInfo>
    </Wrapper>
  );
}
export default User;
