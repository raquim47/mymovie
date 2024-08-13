import { useQuery } from '@tanstack/react-query';
import Banner from 'components/banner';
import Loader from 'components/ui/Loader';
import { getLatestMovies, getUpcomingMovies } from 'services/movies/collections';
import * as S from './styles';

const Banners = ({}: {}) => {
  const { data: latestMovies, isLoading: isLoadingLeft } = useQuery({
    queryKey: ['movies', 'latest'],
    queryFn: getLatestMovies,
  });
  const { data: upcomingMovies, isLoading: isLoadingRight } = useQuery({
    queryKey: ['movies', 'upcoming'],
    queryFn: getUpcomingMovies,
  });

  if (isLoadingLeft || isLoadingRight) {
    <Loader />;
  }

  const leftData = latestMovies?.results?.[0];
  const rightData = upcomingMovies?.results?.[0];

  return (
    <S.BannersContainer>
      {leftData && (
        <div>
          <S.Title>이번 주 신작</S.Title>
          <Banner data={leftData} />
        </div>
      )}
      {rightData && (
        <div>
          <S.Title>개봉 예정</S.Title>
          <Banner data={rightData} />
        </div>
      )}
    </S.BannersContainer>
  );
};

export default Banners;
