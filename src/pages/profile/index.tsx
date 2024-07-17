import { useAppSelector } from 'hooks/useAppSelector';
import { useLogout } from 'hooks/auth';
import EditImage from 'components/profile/EditImage';
import NickNameForm from 'components/profile/NickNameForm';
import Buttons from 'components/ui/buttons';
import ST from './styles';

const ProfilePage = () => {
  const email = useAppSelector((state) => state.user.userData?.email);
  const { mutate: logout, isLoading } = useLogout();

  return (
    <ST.Container>
      <ST.LeftSection>
        <EditImage />
      </ST.LeftSection>
      <ST.RightSection>
        <NickNameForm />
        <p className="email">계정 : {email}</p>
        <Buttons.Base onClick={() => logout()} disabled={isLoading}>
          로그아웃
        </Buttons.Base>
      </ST.RightSection>
    </ST.Container>
  );
};

export default ProfilePage;
