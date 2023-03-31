import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import Library from '../components/list/Library';
import { ISortType, sortMovies } from '../utils/utils';
import { useState } from 'react';

function Rate() {
  const [sortType, setSortType] = useState<ISortType>('lowRate');
  const ratedMovies = useSelector(
    (state: RootState) => state.userData?.ratedMovies
  );
  const sortedRatedMovies = ratedMovies ? sortMovies(ratedMovies, sortType) : [];
  return (
    <div>
      <Library movieList={sortedRatedMovies}/>
    </div>
  );
}

export default Rate;