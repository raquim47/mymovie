import MovieList from 'components/movie-list';
import withSlider from 'hoc/with-slider';
import useSetListSize from 'hooks/ui/list-size';
import { IMovie } from 'hooks/movies/types';
import ST from './styles';

const SliderLayout = ({
  trendingData,
  latestData,
  topRatedData,
}: {
  trendingData?: IMovie[];
  latestData?: IMovie[];
  topRatedData?: IMovie[];
}) => {
  const listSize = useSetListSize({
    default: 2,
    576: 3,
    768: 4,
    1200: 5,
  });
  const MovieListSlider = withSlider(MovieList);
  return (
    <ST.SlidersContainer>
      <ST.SectionTitle>요즘 인기</ST.SectionTitle>
      <MovieListSlider data={trendingData ?? []} listSize={listSize} />
      <ST.SectionTitle>최신 개봉</ST.SectionTitle>
      <MovieListSlider data={latestData ?? []} listSize={listSize} />
      <ST.SectionTitle>Top 평점</ST.SectionTitle>
      <MovieListSlider data={topRatedData ?? []} listSize={listSize} />
    </ST.SlidersContainer>
  );
};

export default SliderLayout;
