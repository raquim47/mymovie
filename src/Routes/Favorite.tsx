import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Library from '../components/list/Library';
import { useEffect, useState } from 'react';
import { ISortMovies, ISortType, sortMovies } from '../utils/utils';
import styled from 'styled-components';
import SortOption from '../components/list/SortOption';

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
  const [sortType, setSortType] = useState<ISortType>(sortTypeArr[0]);
  const [sortedFavoriteMovies, setSortedFavoriteMovies] = useState<ISortMovies[]>([]);

  // const sortedFavoriteMovies = favoriteMovies
  //   ? sortMovies(favoriteMovies, sortType)
  //   : [];

  
  console.log(sortedFavoriteMovies)
  useEffect(() => {
    if (favoriteMovies) {
      setSortedFavoriteMovies(sortMovies(favoriteMovies, sortType));
    } else {
      setSortedFavoriteMovies([]);
    }
  }, [favoriteMovies, sortType]);

  return (
    <div>
      <SortOption sortTypeArr={sortTypeArr} setSortType={setSortType} />
      {<Library movieList={sortedFavoriteMovies} />}
    </div>
  );
}

export default Favorite;
