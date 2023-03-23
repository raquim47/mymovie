import { getAuth } from 'firebase/auth';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthInput from '../components/auth/AuthInput';
import { RootState } from '../store';
import { checkNickNameExists } from '../utils/utils';

const Wrapper = styled.div`
  width: 480px;
  margin: 0 auto;
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

const Info = styled.div`
  width: 180px;
`;
const NickName = styled.div`
  height: 110px;

  h2 {
    font-size: 36px;
    font-weight: 800;
    margin-bottom: 6px;
  }
  span {
    color: ${(props) => props.theme.purple};
    font-size: 14px;
    font-weight: 500;
    text-decoration: underline;
    cursor: pointer;
  }
`;

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

const ColoredBtn = styled(Btn)`
  background-color: ${(props) => props.theme.purple};
  margin-top: 4px;
  padding: 4px 0;
  font-size: 12px;
`;

const EditNickForm = styled.form`
  height: 110px;
`;

const Email = styled.p`
  font-size: 14px;
`;

interface INickName {
  nickName: string;
}

function Profile() {
  const { isLoggedIn } = useSelector((state: RootState) => state.init);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn]);

  const userData = useSelector((state: RootState) => state.userData);
  const [editNick, setEditNick] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INickName>({ mode: 'onChange' });

  const handleValid = async (data: INickName) => {
    const user = auth.currentUser;
    try {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, { nickName: data.nickName });
        setEditNick(false);
      }
      alert('변경 완료');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Wrapper>
      <ProfileInfo>
        <Photo>
          <img
            src={
              userData?.userPhoto
                ? userData?.userPhoto
                : require('../assets/profile.png')
            }
            alt="프로필 이미지"
          />
          <Btn>이미지 업로드</Btn>
          <Btn>이미지 삭제</Btn>
        </Photo>
        <Info>
          {!editNick ? (
            <NickName>
              <h2>{userData?.nickName}</h2>
              <span onClick={() => setEditNick(true)}>닉네임 수정</span>
            </NickName>
          ) : (
            <EditNickForm onSubmit={handleSubmit(handleValid)}>
              <AuthInput
                name="nickName"
                registerOptions={register('nickName', {
                  required: '닉네임을 입력해주세요',
                  pattern: {
                    value: /^[가-힣a-zA-Z0-9]{2,16}$/,
                    message: '공백 제외 영어, 숫자, 한글 2자~12자',
                  },
                  validate: async (value) =>
                    await checkNickNameExists(value, userData?.nickName),
                })}
                placeholder="닉네임"
                defaultValue={userData?.nickName}
                errors={errors}
              />
              <ColoredBtn type="submit">저장</ColoredBtn>
            </EditNickForm>
          )}
          <Email>계정 : {userData?.email}</Email>
        </Info>
      </ProfileInfo>
    </Wrapper>
  );
}
export default Profile;
