import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Library from '../components/list/Library';
import { ISortType } from '../utils/utils';

function Favorite() {
  const favoriteMovies = useSelector(
    (state: RootState) => state.userData?.favoriteMovies
  );
  const sortTypeArr: ISortType[] = [
    'newest',
    'oldest',
    'lowAveRate',
    'highAveRate',
  ];
  if (!favoriteMovies) return <div>loading</div>;
  return (
    <div>
      <Library movieList={favoriteMovies} sortTypeArr={sortTypeArr} />
    </div>
  );
}

export default Favorite;
