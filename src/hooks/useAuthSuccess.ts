import { queryClient } from 'config';
import { useNavigate } from 'react-router-dom';

const useAuthSuccess = () => {
  const navigate = useNavigate();
  return () => {
    queryClient.invalidateQueries({ queryKey: ['user'] });
    navigate('/');
  };
};

export default useAuthSuccess;
