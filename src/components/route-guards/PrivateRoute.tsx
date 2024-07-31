import { useAppSelector } from 'store';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ERRORS } from 'utils/error';
import useToast from 'hooks/ui/useToast';
import PATH from 'utils/path';

const PrivateRoute = () => {
  const { userData: user, isInitialized } = useAppSelector((state) => state.user);
  const toast = useToast();

  useEffect(() => {
    if (isInitialized && !user) {
      toast(ERRORS.REQUIRED_LOGIN);
    }
  }, [user, isInitialized, toast]);

  if (!isInitialized) return null;

  return user ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};

export default PrivateRoute;
