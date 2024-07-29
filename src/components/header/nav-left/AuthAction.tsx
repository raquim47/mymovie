import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import ST from './styles';
import { useAppSelector } from 'store';

const AuthAction = () => {
  const { userData: user, isInitialized } = useAppSelector((state) => state.user);
  return (
    <ST.NavItem>
      {isInitialized && !user && (
        <NavLink to="/login">
          <FontAwesomeIcon icon={faRightToBracket} />
          로그인
        </NavLink>
      )}
      {isInitialized && user && (
        <ST.LogoutBtn>
          <FontAwesomeIcon icon={faRightFromBracket} />
          로그아웃
        </ST.LogoutBtn>
      )}
    </ST.NavItem>
  );
};

export default AuthAction;
