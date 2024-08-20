import InfiniteList from 'components/list/infinite-list';
import MovieList from 'components/list/movie-list';
import SortOptions from 'components/sort-options';
import useInfiniteMovies from 'hooks/useInfiniteMovies';
import useListSize from 'hooks/useListSize';
import useSort from 'hooks/useSort';
import { Outlet } from 'react-router-dom';
import { fetchUserReviewedMovies } from 'services/movies/reviews';

const ReviewedPage = () => {
  const listSize = useListSize({
    default: 3,
    576: 4,
    1200: 5,
  });

  const { movies, isFetching, observerRef, hasNextPage } = useInfiniteMovies(
    ['users', 'me', 'reviewed'],
    fetchUserReviewedMovies,
    listSize
  );

  const { sortedData, sortOrder, setSortOrder } = useSort(movies, {
    newest: (a, b) => b.timestamp! - a.timestamp!,
    oldest: (a, b) => a.timestamp! - b.timestamp!,
    highest: (a, b) => b.rating! - a.rating!,
    lowest: (a, b) => a.rating! - b.rating!,
  });
  return (
    <>
      <SortOptions
        sortOrder={sortOrder}
        onChange={setSortOrder}
        options={[
          { value: 'newest', label: '최신 순' },
          { value: 'oldest', label: '오래된 순' },
          { value: 'highest', label: '평점 높은 순' },
          { value: 'lowest', label: '평점 낮은 순' },
        ]}
      />
      <InfiniteList
        data={sortedData}
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

export default ReviewedPage;
