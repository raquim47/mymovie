import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import Library from '../components/list/Library';
import { useState } from 'react';
import { ISortType, sortMovies } from '../utils/utils';

const Wrapper = styled.div`
  padding: 0 30px;
`;

function Favorite() {
  const [sortType, setSortType] = useState<ISortType>('lowRate');
  const favoriteMovies = useSelector(
    (state: RootState) => state.userData?.favoriteMovies
  );
  const sortedFavoriteMovies = favoriteMovies ? sortMovies(favoriteMovies, sortType) : [];
  return (
    <Wrapper>
      {<Library movieList={sortedFavoriteMovies} rowSize={6} />}
    </Wrapper>
  );
}

export default Favorite;
