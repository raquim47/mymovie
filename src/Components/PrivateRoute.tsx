import { useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { ReactNode, useEffect } from 'react';
function PrivateRoute({ children }: { children: ReactNode }) {
  const authMatch = useMatch('/auth');
  const { isLoggedIn } = useSelector((state: RootState) => state.init);
  const navigate = useNavigate();
 
  useEffect(() => {
    if (authMatch && isLoggedIn) {
      navigate('/home');
      return
    } 

    if (authMatch && !isLoggedIn) {
      return;
    }

    if (!isLoggedIn) {
      navigate('/auth');
      alert('로그인이 필요합니다.');
    }
  }, [isLoggedIn, navigate, authMatch]);

  if (!authMatch && !isLoggedIn) {
    return null;
  }

  return <>{children}</>;
}

export default PrivateRoute;
