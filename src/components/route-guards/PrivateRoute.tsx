import { useAppSelector } from 'store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { addToast } from 'store/toast';
import { ERRORS } from 'utils/error';

const PrivateRoute = () => {
  const { userData: user, isInitialized } = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isInitialized && !user) {
      dispatch(addToast(ERRORS.REQUIRED_LOGIN));
    }
  }, [user, isInitialized, dispatch]);

  if(!isInitialized) return null;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
