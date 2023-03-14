import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SearchForm from '../Components/SearchForm';

const Wrapper = styled.div`
  padding: 110px 30px 50px 270px;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');
  
  return (
    <Wrapper>
      <p>{keyword}로 검색한 결과입니다</p>
    </Wrapper>
  );
}
export default Search;
