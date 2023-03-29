import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import Library from '../components/etc/Library';

const Wrapper = styled.div`
  padding: 0 30px;
`;

function Rate() {
  const ratedMovie = useSelector(
    (state: RootState) => state.userData?.ratedMovie
  );

  return (
    <Wrapper>
      {/* {ratedMovie && <Library movieList={ratedMovie} rowSize={6} />} */}
    </Wrapper>
  );
}

export default Rate;