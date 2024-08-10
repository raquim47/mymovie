import { queryClient } from 'config';
import { useNavigate } from 'react-router-dom';

const useLoginSuccess = () => {
  const navigate = useNavigate();
  return () => {
    queryClient.invalidateQueries({ queryKey: ['initUser'] });
    navigate('/');
  };
};

export default useLoginSuccess;
