import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import Library from '../components/list/Library';
import { ISortType, sortMovies } from '../utils/utils';
import { useState } from 'react';

const Wrapper = styled.div`
  padding: 0 30px;
`;

function Rate() {
  const [sortType, setSortType] = useState<ISortType>('lowRate');
  const ratedMovies = useSelector(
    (state: RootState) => state.userData?.ratedMovies
  );
  const sortedRatedMovies = ratedMovies ? sortMovies(ratedMovies, sortType) : [];
  return (
    <Wrapper>
      <Library movieList={sortedRatedMovies} rowSize={6} />
    </Wrapper>
  );
}

export default Rate;