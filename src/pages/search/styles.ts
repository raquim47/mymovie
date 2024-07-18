import styled from 'styled-components';

const Keyword = styled.h2`
  font-size: 30px;
  padding-bottom: 10px;
  border-bottom: 3px solid ${(props) => props.theme.color.gray};
`;

const SearchResults = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6vw;
  padding: 6vw 0;
  overflow: hidden;
  @media (min-width : 768px){
    padding: 5vw 0;
    gap: 5vw;
  }
  @media (min-width : 992px){
    padding: 4vw 0;
    gap: 4vw;
  }
  @media (min-width : 1200px){
    padding: 3vw 0;
    gap: 3vw;
  }
`;

const RatioBox = styled.div`
  position: relative;
  padding-top: 48%;

  @media (min-width : 576px){
    padding-top: 36%;
  }
  @media (min-width : 992px){
    padding-top: 36%;
  }
  @media (min-width : 1200px){
    padding-top: 30%;
  }
  & > ul {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const Observer = styled.div`
  height: 10px;
`

const ST = { Keyword, SearchResults, RatioBox, Observer };
export default ST;
