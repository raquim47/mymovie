import { Navigate, Outlet } from 'react-router-dom';
import useCurrentUser from 'hooks/useCurrentUser';
import PATH from 'utils/path';
import Loader from 'components/ui/Loader';

const PublicRoute = () => {
  const { user, isLoading } = useCurrentUser();

  if (isLoading) return <Loader />;

  return user ? <Navigate to={PATH.HOME} /> : <Outlet />;
};

export default PublicRoute;
