import { useAppSelector } from 'hooks/useAppSelector';
import { useLogout } from 'hooks/auth';
import EditImage from 'components/profile/EditImage';
import NickNameForm from 'components/profile/NickNameForm';
import Buttons from 'components/ui/buttons';
import Styled from './styled';

const ProfilePage = () => {
  const email = useAppSelector((state) => state.user.userData?.email);
  const { mutate: logout, isLoading } = useLogout();

  return (
    <Styled.Container>
      <Styled.LeftSection>
        <EditImage />
      </Styled.LeftSection>
      <Styled.RightSection>
        <NickNameForm />
        <p className="email">계정 : {email}</p>
        <Buttons.Base onClick={() => logout()} disabled={isLoading}>
          로그아웃
        </Buttons.Base>
      </Styled.RightSection>
    </Styled.Container>
  );
};

export default ProfilePage;
