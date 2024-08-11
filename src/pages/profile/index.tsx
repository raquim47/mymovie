import EditImage from 'components/profile/EditImage';
import NickNameForm from 'components/profile/NickNameForm';
import ST from './styles';
import useGetUser from 'hooks/users/useGetUser';

const ProfilePage = () => {
  const {user} = useGetUser();
  return (
    <ST.Container>
      <ST.LeftSection>
        <EditImage />
      </ST.LeftSection>
      <ST.RightSection>
        <NickNameForm />
        <p className="email">계정 : {user?.email}</p>
        <ST.LogoutBtn>로그아웃</ST.LogoutBtn>
      </ST.RightSection>
    </ST.Container>
  );
};

export default ProfilePage;
