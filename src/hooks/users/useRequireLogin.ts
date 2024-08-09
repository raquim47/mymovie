import { useAppSelector } from 'store';
import { ERRORS } from 'utils/errors';
import useToast from 'hooks/ui/useToast';

const useRequireLogin = () => {
  const user = useAppSelector((state) => state.user.userData);
  const toast = useToast();

  const requireLogin = () => {
    if (!user) {
      toast(ERRORS.REQUIRED_LOGIN);
      return false;
    }
    return true;
  };

  return { user, requireLogin };
};

export default useRequireLogin;
