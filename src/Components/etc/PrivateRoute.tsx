import { useSelector } from 'react-redux';
import { Route, useMatch, useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { ComponentType, useEffect } from 'react';

function PrivateRoute({ component: Component }: { component: ComponentType }) {
  const authMatch = useMatch('/auth');
  const { isLoggedIn } = useSelector((state: RootState) => state.init);
  const navigate = useNavigate();

  useEffect(() => {
    if (authMatch && isLoggedIn) {
      navigate('/home');
      return;
    }

    if (authMatch && !isLoggedIn) {
      return;
    }

    if (!isLoggedIn) {
      navigate('/auth');
      alert('로그인이 필요합니다.');
    }
  }, [isLoggedIn, authMatch]);

  if (!authMatch && !isLoggedIn) {
    return null;
  }

  return <Component />;
}

export default PrivateRoute;
