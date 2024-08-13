import { Navigate, Outlet } from 'react-router-dom';
import { ERRORS } from 'utils/errors';
import useToast from 'hooks/useToast';
import PATH from 'utils/path';
import useCurrentUser from 'hooks/useCurrentUser';
import { useEffect } from 'react';
import Loader from 'components/ui/Loader';

const PrivateRoute = () => {
  const { user, isLoading } = useCurrentUser();
  const { addToast } = useToast();

  useEffect(() => {
    if (!isLoading && !user) {
      addToast(ERRORS.REQUIRED_LOGIN);
    }
  }, [isLoading, user, addToast]);

  if (isLoading) return <Loader />;

  return user ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};

export default PrivateRoute;
