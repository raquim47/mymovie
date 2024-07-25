import { useAppSelector } from 'hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { addToast } from 'store/toast';
import { ERRORS } from 'utils/error';

const useRequireLogin = () => {
  const user = useAppSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const requireLogin = () => {
    if (!user) {
      dispatch(addToast(ERRORS.REQUIRED_LOGIN));
      return false;
    }
    return true;
  };

  return { user, requireLogin };
};

export default useRequireLogin;
