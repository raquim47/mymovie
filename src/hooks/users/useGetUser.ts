import { useQuery } from '@tanstack/react-query';
import { requestUser } from 'services/users';

const useGetUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['initUser'],
    queryFn: requestUser,
  });
  return { user: data, isLoading };
};

export default useGetUser;
