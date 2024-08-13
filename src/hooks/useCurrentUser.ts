import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from 'services/users/user';

const useCurrentUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: fetchCurrentUser,
  });
  return { user: data, isLoading };
};

export default useCurrentUser;
