import { useParams } from 'react-router-dom';
import useGetUser from './useGetUser';

const useGetMyMovieReview = () => {
  const movieId = useParams().id || '';
  const { user } = useGetUser();
  const rating = user?.reviewed[movieId]?.rating || 0;
  const comment = user?.reviewed[movieId]?.comment || '';
  return { rating, comment };
};

export default useGetMyMovieReview;
