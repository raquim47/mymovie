import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Btn } from './types';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useLogout } from 'hooks/auth';

const LogoutBtn = () => {
  const { isLoading, mutate } = useLogout();
  return (
    <Btn disabled={isLoading} onClick={() => mutate()}>
      <FontAwesomeIcon icon={faRightFromBracket} />
      로그아웃
    </Btn>
  );
};

export default LogoutBtn;
