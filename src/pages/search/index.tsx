import MovieList from 'components/movie-list';
import Loader from 'components/ui/Loader';
import useInfiniteMovies, { getSearchedMovies } from 'hooks/movies/useInfiniteMovies';
import useSetListSize from 'hooks/ui/list-size';
import { Outlet, useLocation } from 'react-router-dom';
import ST from './styles';

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get('keyword') || '';

  const listSize = useSetListSize({
    default: 3,
    576: 4,
    1200: 5,
  });
  const { movies, isFetching, hasNextPage, observerRef } = useInfiniteMovies(
    ['movies', keyword],
    (page) => getSearchedMovies(page, keyword),
    listSize
  );

  return (
    <>
      <ST.Keyword>'{keyword}' 으로 검색한 결과입니다.</ST.Keyword>
      <ST.SearchResults>
        {movies.map((list, index) => (
          <ST.RatioBox key={index}>
            <MovieList data={list} listSize={listSize} imageType="poster" />
          </ST.RatioBox>
        ))}
        {isFetching && <Loader />}
        {hasNextPage && <ST.Observer ref={observerRef} />}
      </ST.SearchResults>
      <Outlet />
    </>
  );
};

export default SearchPage;
