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
import { AuthInput } from '../components/components';
import { storageService } from '../services/fbaseInit';
import { checkNickNameExists } from '../services/fbaseFunc';
import { User } from 'firebase/auth';

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
  display: block;
  width: 100%;
  margin-top: 12px;
  padding: 10px 0;
  border: none;
  background-color: ${(props) => props.theme.gray};
  color: ${(props) => props.theme.white.white};
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
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
          <AddPhoto>
            <Btn as="label" htmlFor="attach-file">
              이미지 업로드
              {/* <Btn>이미지 업로드</Btn> */}
            </Btn>
            <input
              id="attach-file"
              type="file"
              accept="image/*"
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
