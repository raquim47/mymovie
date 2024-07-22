import { useParams } from 'react-router-dom';
import Modal from './modal';
import ST from './styles';
import { useGetMovieDetail } from 'hooks/useGetMovieDetail';
import Loader from 'components/ui/Loader';
import MDHeader from './header';
import MDSummary from './summary';
import UserActions from './user-actions';

const MovieDetail = () => {
  const { movieId } = useParams();
  const { data: movie, isLoading, error } = useGetMovieDetail(Number(movieId!));

  return (
    <Modal>
      {isLoading && <Loader />}
      {!isLoading && error ? (
        <p>error</p>
      ) : (
        movie && (
          <ST.Content>
            <MDHeader movie={movie} />
            <UserActions
              movie={{
                id: movie?.id,
                title: movie?.title,
                poster_path: movie?.poster_path,
                genres: movie?.genres,
              }}
            />
            <MDSummary tagline={movie.tagline} overview={movie.overview} />
          </ST.Content>
        )
      )}
    </Modal>
  );
};

export default MovieDetail;
