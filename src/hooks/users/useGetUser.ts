import { useQuery } from '@tanstack/react-query';
import requestUser from 'services/users/user';

const useGetUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: requestUser,
  });
  return { user: data, isLoading };
};

export default useGetUser;
