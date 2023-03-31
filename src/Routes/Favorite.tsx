import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import Library from '../components/list/Library';
import { useState } from 'react';
import { ISortType, sortMovies } from '../utils/utils';

function Favorite() {
  const [sortType, setSortType] = useState<ISortType>('lowRate');
  const favoriteMovies = useSelector(
    (state: RootState) => state.userData?.favoriteMovies
  );
  const sortedFavoriteMovies = favoriteMovies ? sortMovies(favoriteMovies, sortType) : [];

  return (
    <div>
      {<Library movieList={sortedFavoriteMovies} />}
    </div>
  );
}

export default Favorite;
