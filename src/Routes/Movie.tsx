import { useQuery } from 'react-query';
import styled from 'styled-components';
import {
  getMovieDetail,
  getMoviesLatest,
  getMoviesUpcoming,
  IGetMoviesResult,
  IMovie,
} from '../api';
import Banner from '../Components/Banner';

const Wrapper = styled.main`
  padding: 40px;
  border: 1px solid red;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function useMovieDetailQuery(movie?: IMovie) {
  return useQuery<IMovie>(
    ['movieDetail', movie?.id],
    () => getMovieDetail(movie?.id!),
    {
      enabled: !!movie?.id,
    }
  );
}

function Movie() {
  const {
    data: dataLatest,
    isLoading: loadingLatest,
    error: latestError,
  } = useQuery<IGetMoviesResult>(['movies', 'latest'], getMoviesLatest);

  const {
    data: dataUpcommming,
    isLoading: loadingUpcommming,
    error: upcomingError,
  } = useQuery<IGetMoviesResult>(['movies', 'upcomming'], getMoviesUpcoming);

  const {
    data: bannerLeftData,
    isLoading: bannerLeftLoading,
    error: bannerLeftError,
  } = useMovieDetailQuery(dataLatest?.results[0]);
  const {
    data: bannerRightData,
    isLoading: bannerRightLoading,
    error: bannerRightError,
  } = useMovieDetailQuery(dataUpcommming?.results[0]);

  const loadings =
    loadingLatest ||
    loadingUpcommming ||
    bannerLeftLoading ||
    bannerRightLoading;

  const error =
    latestError || upcomingError || bannerLeftError || bannerRightError;

  if (loadings) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <Wrapper>
      <h2>홈</h2>
      <Banner bannerLeftData={bannerLeftData} bannerRightData={bannerRightData} />
    </Wrapper>
  );
}
export default Movie;
