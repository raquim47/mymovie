import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import Library from '../components/etc/Library';

const Wrapper = styled.div`
  padding: 0 30px;
`;

function Favorite() {
  const favoriteMovie = useSelector(
    (state: RootState) => state.userData?.favoriteMovie
  );

  return (
    <Wrapper>
      {favoriteMovie && <Library movieList={favoriteMovie} rowSize={6} />}
    </Wrapper>
  );
}

export default Favorite;
