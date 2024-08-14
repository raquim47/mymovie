import InfiniteList from 'components/list/infinite-list';
import MovieList from 'components/list/movie-list';
import useInfiniteMovies from 'hooks/useInfiniteMovies';
import useListSize from 'hooks/useListSize';
import { Outlet, useLocation } from 'react-router-dom';
import { getSearchedMovies } from 'services/movies/search';
import * as S from './styles';

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get('keyword') || '';

  const listSize = useListSize({
    default: 3,
    576: 4,
    1200: 5,
  });

  const { movies, isFetching, observerRef, hasNextPage } = useInfiniteMovies(
    ['movies', 'search', keyword],
    (page) => getSearchedMovies(page, keyword),
    listSize
  );
  return (
    <>
      <S.Keyword>'{keyword}' 으로 검색한 결과입니다.</S.Keyword>
      <InfiniteList
        data={movies}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        observerRef={observerRef}
        renderItem={(list) => (
          <MovieList data={list} listSize={listSize} imageType="poster" />
        )}
      />
      <Outlet />
    </>
  );
};

export default SearchPage;
