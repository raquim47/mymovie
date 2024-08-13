import { ERRORS } from 'utils/errors';
import useToast from 'hooks/useToast';
import useCurrentUser from './useCurrentUser';

const useRequireLogin = () => {
  const { user } = useCurrentUser();
  const { addToast } = useToast();

  const requireLogin = () => {
    if (!user) {
      addToast(ERRORS.REQUIRED_LOGIN);
      return false;
    }
    return true;
  };

  return { user, requireLogin };
};

export default useRequireLogin;
