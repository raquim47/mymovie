import { useLogout } from 'hooks/auth';
import { useAppSelector } from 'hooks/useAppSelector';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const AuthActions = () => {
  const user = useAppSelector((state) => state.user.userData);
  const { isLoading, mutate: logout } = useLogout();

  return user ? (
    <button className='logout' onClick={() => logout()} disabled={isLoading}>
      <FontAwesomeIcon icon={faRightFromBracket} />
      로그아웃
    </button>
  ) : (
    <NavLink to="/login">
      <FontAwesomeIcon icon={faRightToBracket} />
      로그인
    </NavLink>
  );
};

export default AuthActions;
