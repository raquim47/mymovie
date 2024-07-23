import { useAppSelector } from 'hooks/useAppSelector';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import ST from './styles';

const AuthAction = () => {
  const user = useAppSelector((state) => state.user.userData);

  return (
    <ST.NavItem>
      {user === null && (
        <NavLink to="/login">
          <FontAwesomeIcon icon={faRightToBracket} />
          로그인
        </NavLink>
      )}
      {user && (
        <ST.LogoutBtn>
          <FontAwesomeIcon icon={faRightFromBracket} />
          로그아웃
        </ST.LogoutBtn>
      )}
    </ST.NavItem>
  );
};

export default AuthAction;
