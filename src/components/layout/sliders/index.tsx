import withSlider from 'hoc/with-slider';
import * as S from './styles';
import { useQuery } from '@tanstack/react-query';
import {
  getLatestMovies,
  getTopRatedMovies,
  getTrendingMovies,
} from 'services/movies/collections';
import Loader from 'components/ui/Loader';
import useListSize from 'hooks/useListSize';
import MovieList from 'components/list/movie-list';

const Sliders = () => {
  const listSize = useListSize({
    default: 2,
    576: 3,
    768: 4,
    1200: 5,
  });
  const MovieListSlider = withSlider(MovieList);

  const { data: trendingData, isLoading: isLoadingTrending } = useQuery({
    queryKey: ['movies', 'trending'],
    queryFn: getTrendingMovies,
  });

  const { data: latestData, isLoading: isLoadingLatest } = useQuery({
    queryKey: ['movies', 'latest'],
    queryFn: getLatestMovies,
  });

  const { data: topRatedData, isLoading: isLoadingTopRated } = useQuery({
    queryKey: ['movies', 'topRated'],
    queryFn: getTopRatedMovies,
  });

  if (isLoadingTrending || isLoadingLatest || isLoadingTopRated) return <Loader />;
  return (
    <S.SlidersContainer>
      {trendingData?.results?.[0] && (
        <>
          <S.Title>요즘 인기</S.Title>
          <MovieListSlider data={trendingData?.results} listSize={listSize} />
        </>
      )}
      {latestData?.results?.[0] && (
        <>
          <S.Title>최신 개봉</S.Title>
          <MovieListSlider data={latestData?.results} listSize={listSize} />
        </>
      )}
      {topRatedData?.results?.[0] && (
        <>
          <S.Title>Top 평점</S.Title>
          <MovieListSlider data={topRatedData?.results} listSize={listSize} />
        </>
      )}
    </S.SlidersContainer>
  );
};

export default Sliders;
