import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import PATH from 'utils/path';
import useCurrentUser from 'hooks/useCurrentUser';
import LogoutButton from 'components/logout';

const AuthLink = () => {
  const { user, isLoading } = useCurrentUser();

  if (!isLoading && !user) {
    return (
      <NavLink to={PATH.LOGIN}>
        <FontAwesomeIcon icon={faRightToBracket} />
        로그인
      </NavLink>
    );
  }

  if (!isLoading && user) {
    return (
      <LogoutButton className='logout'>
        <FontAwesomeIcon icon={faRightFromBracket} />
        로그아웃
      </LogoutButton>
    );
  }

  return null;
};

export default AuthLink;