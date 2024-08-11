import { ERRORS } from 'utils/errors';
import useToast from 'hooks/ui/useToast';
import useGetUser from './useGetUser';

const useRequireLogin = () => {
  const { user } = useGetUser();
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
