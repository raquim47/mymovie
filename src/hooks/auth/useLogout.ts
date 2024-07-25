import { requestLogout } from 'services/auth';
import useAuthMutation from './useAuthMutation';

const useLogout = () => useAuthMutation(requestLogout);

export default useLogout;
