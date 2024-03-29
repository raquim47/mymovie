import { uuidv4 } from '@firebase/util';
import { auth, db, doc, getDoc, updateDoc } from '../services/fbaseInit';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import { storageService } from '../services/fbaseInit';
import { checkNickNameExists } from '../services/fbaseFunc';
import { User } from 'firebase/auth';
import AuthInput from '../components/auth/AuthInput';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  max-width: 400px;
  margin: 100px auto 0;
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
  border-right: 1px solid ${(props) => props.theme.color.gray};
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
    font-size: ${(props) => props.theme.fontSizePx.xxl};
    font-weight: 600;
    margin-bottom: 6px;
    white-space: nowrap;
  }
  span {
    color: ${(props) => props.theme.color.purple.normal};
    font-size: ${(props) => props.theme.fontSizePx.s};
    font-weight: 500;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Btn = styled.button`
  display: block;
  width: 100%;
  margin-top: 12px;
  padding: 10px 0;
  border: none;
  background-color: ${(props) => props.theme.color.gray};
  color: ${(props) => props.theme.color.white.normal};
  border-radius: 4px;
  font-size: ${(props) => props.theme.fontSizePx.s};
  font-weight: 400;
  text-align: center;
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.color.purple.dark};
  }
`;
const ColoredBtn = styled(Btn)`
  background-color: ${(props) => props.theme.color.purple.normal};
  margin-top: 4px;
  padding: 4px 0;
  font-size: ${(props) => props.theme.fontSizePx.xs};
`;

const EditNickForm = styled.form`
  height: 110px;
`;

const Email = styled.p`
  font-size: ${(props) => props.theme.fontSizePx.s};
  margin-bottom: 30px;
`;

const AddPhoto = styled.div`
  width: 100%;
  input {
    display: none;
  }
`;

interface INickName {
  nickName: string;
}

function Profile() {
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.userData);
  const [editNick, setEditNick] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachment, setAttachment] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INickName>({ mode: 'onChange' });

  // 새로운 닉네임 등록
  const handleNickNameValid = async (data: INickName) => {
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
  // storage 이미지 삭제
  const deleteStorageImage = async (user: User) => {
    const userRef = doc(db, 'users', user.uid);
    const userData = await getDoc(userRef);

    if (userData.data()?.userPhoto) {
      const photoRef = ref(storageService, userData.data()?.userPhoto);
      await deleteObject(photoRef);
    }
  };
  // input 파일 url, attachment에 저장
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList?.[0]) {
      setAttachment('');
      return;
    }
    const file = fileList[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      setAttachment(result as string);
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };
  // 이미지 등록 (firestore, storage)
  useEffect(() => {
    if (!attachment) {
      return;
    }

    const user = auth.currentUser;
    if (user) {
      deleteStorageImage(user).then(() => {
        const fileRef = ref(
          storageService,
          `user/userPhoto/${user.uid}/${uuidv4()}`
        );
        uploadString(fileRef, attachment, 'data_url')
          .then(async (response) => {
            const url = await getDownloadURL(response.ref);
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, { userPhoto: url });
          })
          .catch((error) => {
            console.error(error);
          });
      });
    }
  }, [attachment]);
  // 이미지 삭제(Firestore의, Storage)
  const deleteUserPhoto = async () => {
    const user = auth.currentUser;
    if (user) {
      // Storage 삭제
      await deleteStorageImage(user);
      // Firestore의 userPhoto url 삭제
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { userPhoto: '' });
      setAttachment('');
    }
  };

  // 로그 아웃
  const onClickLogOut = () => {
    const confirmLogout = window.confirm('로그아웃 하시겠습니까?');
    if (confirmLogout) {
      auth.signOut();
      navigate('/home');
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
            alt='프로필 이미지'
          />
          <AddPhoto>
            <Btn as='label' htmlFor='attach-file'>
              이미지 업로드
              {/* <Btn>이미지 업로드</Btn> */}
            </Btn>
            <input
              id='attach-file'
              type='file'
              accept='image/*'
              onChange={onFileChange}
              ref={fileInputRef}
            />
          </AddPhoto>

          <Btn onClick={deleteUserPhoto}>이미지 삭제</Btn>
        </Photo>
        <Info>
          {!editNick ? (
            <NickName>
              <h2>{userData?.nickName}</h2>
              <span onClick={() => setEditNick(true)}>닉네임 수정</span>
            </NickName>
          ) : (
            <EditNickForm onSubmit={handleSubmit(handleNickNameValid)}>
              <AuthInput
                name='nickName'
                registerOptions={register('nickName', {
                  required: '닉네임을 입력해주세요',
                  pattern: {
                    value: /^[가-힣a-zA-Z0-9]{2,8}$/,
                    message: '공백 제외 영어, 숫자, 한글 2자~8자',
                  },
                  validate: async (value) =>
                    await checkNickNameExists(value, userData?.nickName),
                })}
                placeholder='닉네임'
                defaultValue={userData?.nickName}
                errors={errors}
              />
              <ColoredBtn type='submit'>저장</ColoredBtn>
            </EditNickForm>
          )}
          <Email>계정 : {userData?.email}</Email>
          <Btn onClick={onClickLogOut}>로그아웃</Btn>
        </Info>
      </ProfileInfo>
    </Wrapper>
  );
}
export default Profile;
