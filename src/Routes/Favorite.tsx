import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { IFavoriteMovie, RootState } from '../store';
import Library from '../components/etc/Library';
import { useState } from 'react';

const Wrapper = styled.div`
  padding: 0 30px;
`;

interface ISortMoviesData {
  [key:number] : IFavoriteMovie;
}
type ISortType = 'newest' | 'oldest' | 'lowRate' | 'highRate';

const sortMovies = (movie: ISortMoviesData, sortType: ISortType) => {
  const movieArr = Object.values(movie);
  switch (sortType) {
    case 'newest':
      return movieArr.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    case 'oldest':
      return movieArr.sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
    case 'lowRate':
      return movieArr.sort((a, b) => a.vote_average - b.vote_average);
    case 'highRate':
      return movieArr.sort((a, b) => b.vote_average - a.vote_average);
    default:
      return movieArr;
  }
};

function Favorite() {
  const [sortType, setSortType] = useState<ISortType>('newest');
  const favoriteMovies = useSelector(
    (state: RootState) => state.userData?.favoriteMovies
  );
  const sortedFavoriteMovies = favoriteMovies ? sortMovies(favoriteMovies, sortType) : [];
  console.log(sortedFavoriteMovies);
  return (
    <Wrapper>
      {<Library movieList={sortedFavoriteMovies} rowSize={6} />}
    </Wrapper>
  );
}

export default Favorite;
