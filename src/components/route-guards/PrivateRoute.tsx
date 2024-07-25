import { useAppSelector } from 'hooks/useAppSelector';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { addToast } from 'store/toast';
import { ERRORS } from 'utils/error';

const PrivateRoute = () => {
  const user = useAppSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(addToast(ERRORS.REQUIRED_LOGIN));
    }
  }, [user, dispatch]);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
