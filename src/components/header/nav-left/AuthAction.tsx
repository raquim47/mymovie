import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import ST from './styles';
import PATH from 'utils/path';
import useGetUser from 'hooks/users/useGetUser';

const AuthAction = () => {
  const { user, isLoading } = useGetUser();
  return (
    <ST.NavItem>
      {!isLoading && !user && (
        <NavLink to={PATH.LOGIN}>
          <FontAwesomeIcon icon={faRightToBracket} />
          로그인
        </NavLink>
      )}
      {!isLoading && user && (
        <ST.LogoutBtn>
          <FontAwesomeIcon icon={faRightFromBracket} />
          로그아웃
        </ST.LogoutBtn>
      )}
    </ST.NavItem>
  );
};

export default AuthAction;
