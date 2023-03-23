import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../store';

const Wrapper = styled.div`
  width: 480px;
  margin: 0 auto;
  h2 {
    margin-bottom: 20px;
    font-size: 32px;
    font-weight: 500;
    text-align: center;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  gap: 30px;
`;

const Photo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
  padding-right: 30px;
  border-right: 1px solid ${(props) => props.theme.gray};
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const Info = styled.div``;

const Btn = styled.button`
  margin-top: 12px;
  width: 100%;
  border: none;
  background-color: ${(props) => props.theme.gray};
  color: ${(props) => props.theme.white.white};
  font-size: 14px;
  padding: 10px 0;
  border-radius: 4px;
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.purpleDark};
  }
`;
function Profile() {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(
    (state: RootState) => state.init
  );

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn]);
  console.log();
  return (
    <Wrapper>
      <ProfileInfo>
        <Photo>
          {/* <img
            src={
              userData?.userPhoto
                ? userData?.userPhoto
                : require('../assets/profile.png')
            }
            alt="프로필 이미지"
          /> */}
          <Btn>이미지 업로드</Btn>
          <Btn>이미지 삭제</Btn>
        </Photo>
        <Info>
          {/* <h2>{userData?.nickName}</h2> */}
          <p>계정 : </p>
        </Info>
      </ProfileInfo>
    </Wrapper>
  );
}
export default Profile;
