import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface IRate {
  isLoggedIn: boolean;
}

function Rate({ isLoggedIn }: IRate) {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [isLoggedIn]);

  return <h2>Rate</h2>;
}

export default Rate;
