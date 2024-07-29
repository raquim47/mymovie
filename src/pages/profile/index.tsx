import { useAppSelector } from 'store';
import EditImage from 'components/profile/EditImage';
import NickNameForm from 'components/profile/NickNameForm';
import ST from './styles';

const ProfilePage = () => {
  const email = useAppSelector((state) => state.user.userData?.email);

  return (
    <ST.Container>
      <ST.LeftSection>
        <EditImage />
      </ST.LeftSection>
      <ST.RightSection>
        <NickNameForm />
        <p className="email">계정 : {email}</p>
        <ST.LogoutBtn>로그아웃</ST.LogoutBtn>
      </ST.RightSection>
    </ST.Container>
  );
};

export default ProfilePage;
