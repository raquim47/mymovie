import EditImage from 'components/profile/edit-image';
import NickNameForm from 'components/profile/edit-nickname';
import * as S from './styles';
import useCurrentUser from 'hooks/useCurrentUser';

const ProfilePage = () => {
  const { user } = useCurrentUser();
  return (
    <S.ProfileBlock>
      <S.LeftSection>
        <EditImage />
      </S.LeftSection>
      <S.RightSection>
        <NickNameForm />
        <p className="email">계정 : {user?.email}</p>
        <S.LogoutBtn>로그아웃</S.LogoutBtn>
      </S.RightSection>
    </S.ProfileBlock>
  );
};

export default ProfilePage;
