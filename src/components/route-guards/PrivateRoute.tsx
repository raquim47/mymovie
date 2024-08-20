import { Navigate, Outlet } from 'react-router-dom';
import { ERRORS } from 'utils/errors';
import PATH from 'utils/path';
import useCurrentUser from 'hooks/useCurrentUser';
import Loader from 'components/ui/Loader';
const PrivateRoute = () => {
  const { user, isLoading } = useCurrentUser();

  if (isLoading) return <Loader />;

  return user ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};

export default PrivateRoute;
