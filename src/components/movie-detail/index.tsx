import { useLocation, useParams } from 'react-router-dom';
import * as S from './styles';
import Loader from 'components/ui/Loader';
import MDHeader from './header';
import MDSummary from './summary';
import UserActions from './user-actions';
import Reviews from './reviews';
import { useQuery } from '@tanstack/react-query';
import { fetchMovieDetail } from 'services/movies/detail';
import ErrorView from 'components/error-view';
import PATH from 'utils/path';
import Modal from 'components/modal';
import ModalBackground from 'components/modal-background';

const MovieDetail = () => {
  const { id } = useParams();
  const locationState = useLocation().state;
  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movies', id],
    queryFn: () => fetchMovieDetail(Number(id)),
  });
  return (
    <>
      <ModalBackground path={locationState?.path} keyword={locationState?.keyword} />
      <Modal>
        {isLoading && <Loader />}
        {!isLoading && error ? (
          <ErrorView code={404} message="데이터를 불러올 수 없습니다." to={PATH.HOME} />
        ) : (
          movie && (
            <S.MovieDetailBlock>
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
              {movie.reviews && Object.keys(movie.reviews).length > 0 && (
                <Reviews reviews={movie.reviews} />
              )}
            </S.MovieDetailBlock>
          )
        )}
      </Modal>
    </>
  );
};

export default MovieDetail;
