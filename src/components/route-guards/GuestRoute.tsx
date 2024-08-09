import { useAppSelector } from 'store';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ERRORS } from 'utils/errors';
import useToast from 'hooks/ui/useToast';

const GuestRoute = () => {
  const { userData: user, isInitialized } = useAppSelector((state) => state.user);
  const toast = useToast();

  useEffect(() => {
    if (isInitialized && user) {
      toast(ERRORS.ALREADY_LOGGED_IN);
    }
  }, [user, isInitialized, toast]);

  if (!isInitialized) return null;

  return user ? <Navigate to=".." /> : <Outlet />;
};

export default GuestRoute;
