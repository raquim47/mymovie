import { Navigate, Outlet } from 'react-router-dom';
import { ERRORS } from 'utils/errors';
import PATH from 'utils/path';
import useCurrentUser from 'hooks/useCurrentUser';
import Loader from 'components/ui/Loader';
import useToast from 'hooks/useToast';
import { useEffect, useRef } from 'react';

const PrivateRoute = () => {
  const { user, isLoading } = useCurrentUser();
  const { addToast } = useToast();
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (!isLoading && !user) {
      addToast(ERRORS.REQUIRED_LOGIN);
    }
  }, [isLoading, user, addToast]);

  if (isLoading) return <Loader />;

  return user ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};

export default PrivateRoute;
