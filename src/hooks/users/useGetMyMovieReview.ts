import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store';

const useGetMyMovieReview = () => {
  const movieId = useParams().id || '';
  const user = useAppSelector((state) => state.user.userData);

  const rating = user?.reviewed[movieId]?.rating || 0;
  const comment = user?.reviewed[movieId]?.comment || '';
  return { rating, comment };
};

export default useGetMyMovieReview;
