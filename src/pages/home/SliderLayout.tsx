import MovieList from 'components/movies/list';
import withSlider from 'hoc/with-slider';
import useSetListSize from 'hooks/useSetListSize';
import { IMovieDetails, IMovieList } from 'services/movies/types';
import { H3, SlidersContainer } from './styled';

const SliderLayout = ({
  trendingData,
  latestData,
  topRatedData,
}: {
  trendingData?: IMovieDetails[];
  latestData?: IMovieDetails[];
  topRatedData?: IMovieDetails[];
}) => {
  const listSize = useSetListSize({
    768: 3,
    1200: 4,
    default: 5,
  });

  const MovieListSlider = withSlider(MovieList);
  return (
    <SlidersContainer>
      <H3>요즘 인기</H3>
      <MovieListSlider data={trendingData ?? []} listSize={listSize} />
      <H3>최신 개봉</H3>
      <MovieListSlider data={latestData ?? []} listSize={listSize} />
      <H3>Top 평점</H3>
      <MovieListSlider data={topRatedData ?? []} listSize={listSize} />
    </SlidersContainer>
  );
};

export default SliderLayout;
