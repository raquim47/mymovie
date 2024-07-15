import Buttons from 'components/ui/buttons';
import { useState } from 'react';
import Styled from './styled';

const ProfilePage = () => {
  const [editNick, setEditNick] = useState(false);
  return (
    <Styled.Container>
      <Styled.LeftSection>
        <img src={require('assets/profile.png')} alt="프로필 이미지" />
        <div className="edit-photo">
          <Buttons.Label htmlFor="attach-file">이미지 업로드</Buttons.Label>
          <input id="attach-file" type="file" accept="image/*" />
        </div>
        <Buttons.Base>이미지 삭제</Buttons.Base>
      </Styled.LeftSection>
      <Styled.RightSection>
        {!editNick ? (
          <Styled.NickName>
            <h2>h1x5pra</h2>
            <button onClick={() => setEditNick(true)}>닉네임 수정</button>
          </Styled.NickName>
        ) : (
          <Styled.NickNameForm>
            <input name="nickName" />
            <div className="buttons">
              <button type="submit">저장</button>
              <button type="button" onClick={() => setEditNick(false)}>
                취소
              </button>
            </div>
          </Styled.NickNameForm>
        )}
        <p className="email">계정 : cmikal47@gmail.com</p>
        <Buttons.Base>로그아웃</Buttons.Base>
      </Styled.RightSection>
    </Styled.Container>
  );
};

export default ProfilePage;
