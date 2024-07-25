import { useAppSelector } from 'hooks/useAppSelector';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { addToast } from 'store/toast';
import { ERRORS } from 'utils/error';

const GuestRoute = () => {
  const { userData: user, isInitialized } = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isInitialized && user) {
      dispatch(addToast(ERRORS.ALREADY_LOGGED_IN));
    }
  }, [user, isInitialized, dispatch]);

  if (!isInitialized) return null;

  return user ? <Navigate to=".." /> : <Outlet />;
};

export default GuestRoute;
