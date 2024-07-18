import { useParams } from 'react-router-dom';
import Modal from './modal';
import ST from './styles';
import { useGetMovieDetail } from 'hooks/useGetMovieDetail';
import { getMovieImagePath } from 'utils/movie-image-path';
import UserOptions from './user-options';
import Loader from 'components/ui/Loader';

const MovieDetail = () => {
  const { movieId } = useParams();
  const { data, isLoading, error } = useGetMovieDetail(Number(movieId!));
  return (
    <Modal>
      {isLoading && <Loader />}
      {!isLoading && error ? (
        <p>error</p>
      ) : (
        data && (
          <ST.Content>
            <ST.Top>
              <img
                className="backdrop"
                src={getMovieImagePath(data, 'backdrop', 'w1280')}
              />
              <ST.Header>
                <ST.Info>
                  <h2>{data?.title}</h2>
                  <h3>{data?.original_title}</h3>
                  <ul>
                    <li>{data?.release_date}</li>
                    <li>{data?.runtime} 분</li>
                    <li className="genres">
                      {data?.genres?.map((genre) => (
                        <span key={genre.id}>{genre.name}</span>
                      ))}
                    </li>
                  </ul>
                </ST.Info>
                <img className="poster" src={getMovieImagePath(data, 'poster', 'w500')} />
              </ST.Header>
            </ST.Top>
            <ST.Bottom>
              <UserOptions />
              <ST.Summary>
                <h3 className="sr-only">줄거리 소개</h3>
                {data?.tagline && <h4>{data.tagline}</h4>}
                <p>{data?.overview}</p>
              </ST.Summary>
            </ST.Bottom>
          </ST.Content>
        )
      )}
    </Modal>
  );
};

export default MovieDetail;
