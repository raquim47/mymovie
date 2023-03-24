import styled from 'styled-components';
import { IUserData } from '../store';

const Wrapper = styled.div`
  width: 250px;
  display: flex;
  align-items: center;
  gap: 18px;
  position: relative;
  padding: 12px;
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }

  h5 {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 6px;
  }
`;

function UserItem({ nickName, userPhoto }: IUserData) {
  return (
    <Wrapper>
      <img
        src={
          userPhoto
            ? userPhoto
            : require('../assets/profile.png')
        }
        alt="유저 이미지"
      />
      <h5>{nickName}</h5>
    </Wrapper>
  );
}

export default UserItem;
