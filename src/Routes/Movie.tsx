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

function Movie() {
  const { data: dataLatest, isLoading: isLoadingLatest } =
    useQuery<IGetMoviesResult>(['movies', 'latest'], getMoviesLatest);

  const { data: dataBannerLeft, isLoading: isLoadingBannerLeft } =
    useQuery<IMovie>(['movieDetail', dataLatest?.results[0].id], () =>
      getMovieDetail(dataLatest?.results[0].id as number),{
        enabled: !!dataLatest?.results[0].id
      }
    );
  console.log(dataBannerLeft);
  // const { data: dataUpcoming, isLoading: isLoadingUpcoming } =
  //   useQuery<IGetMoviesResult>(['movies', 'upcoming'], getMoviesUpcoming);

  // const { data: dataBannerRight, isLoading: isLoadingBannerRight } =
  //   useQuery<IMovie>(
  //     ['movieDetail', dataUpcoming],
  //     () => getMovieDetail(dataUpcoming.results[0].id),
  //     {
  //       enabled: !!dataUpcoming,
  //     }
  //   );

  return (
    <Wrapper>
      {isLoadingLatest || isLoadingBannerLeft ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <h2>홈</h2>
          <Banner dataLeft={dataBannerLeft as IMovie} />
        </>
      )}
    </Wrapper>
  );
}
export default Movie;
