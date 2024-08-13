import MovieList from 'components/movie-list';
import Loader from 'components/ui/Loader';
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
      <S.SearchResults>
        {movies.map((list, index) => (
          <S.RatioBox key={index}>
            <MovieList data={list} listSize={listSize} imageType="poster" />
          </S.RatioBox>
        ))}
        {isFetching && <Loader />}
        {hasNextPage && <S.Observer ref={observerRef} />}
      </S.SearchResults>
      <Outlet />
    </>
  );
};

export default SearchPage;
