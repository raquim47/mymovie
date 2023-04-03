import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Library from '../components/list/Library';
import { ISortType } from '../utils/utils';

function Rate() {
  const ratedMovies = useSelector(
    (state: RootState) => state.userData?.ratedMovies
  );
  const sortTypeArr: ISortType[] = [
    'newest',
    'oldest',
    'lowAveRate',
    'highAveRate',
    'lowMyRate',
    'highMyRate'
  ];
  if (!ratedMovies) return <div>loading</div>;
  return (
    <div>
      <Library movieList={ratedMovies} sortTypeArr={sortTypeArr} />
    </div>
  );
}

export default Rate;
