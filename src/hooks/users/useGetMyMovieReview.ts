import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store';

const useGetMyMovieReview = () => {
  const { movieId } = useParams();
  const user = useAppSelector((state) => state.user.userData);
  const rating = (movieId && user?.reviewList[movieId]?.rating) || 0;
  const comment = (movieId && user?.reviewList[movieId]?.comment) || '';

  return { rating, comment };
};

export default useGetMyMovieReview;
