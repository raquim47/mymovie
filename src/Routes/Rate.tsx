import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';

function Rate() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state:RootState) => state.user.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      navigate('/auth');
    }
  }, [isLoggedIn]);

  return <h2>Rate</h2>;
}

export default Rate;
