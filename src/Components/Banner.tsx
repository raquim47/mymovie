import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovieDetail, IMovie } from '../api';
import { makeImagePath } from '../utils';

const Wrapper = styled.div`
  margin: 0 -8px;
`;
const Item = styled.div`
  display: inline-block;
  width: 50%;
  padding: 0 8px;
`;

const Desc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.white.white};

  small {
    font-size: 12px;
    font-weight: 500;
  }

  h3 {
    font-size: 22px;
    font-weight: 700;
  }

  p {
    width: 100%;
    white-space: nowrap;
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    /* font-weight: 400; */
    color: ${(props) => props.theme.white.darker};
  }
`;

const Figure = styled.figure`
  border-radius: 4px;
  overflow: hidden;

  img {
    width: 100%;
    object-fit: cover;
  }
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Banner({
  dataLeft
}: {
  dataLeft : IMovie
}) {
  return (
    <Wrapper>
      <Item>
        <Desc>
          <small>신작 소개</small>
          <h3>{dataLeft?.title}</h3>
          <p>{dataLeft?.tagline}</p>
        </Desc>
        <Figure>
          <img src={makeImagePath(dataLeft?.backdrop_path || 'w500')} alt="" />
        </Figure>
      </Item>
      <Item>
        {/* <Desc>
          <small>개봉 예정</small>
          <h3>{dataRight?.title}</h3>
          <p>{dataRight?.tagline}</p>
        </Desc>
        <Figure>
          <img src={makeImagePath(dataRight?.backdrop_path || 'w500')} alt="" />
        </Figure> */}
      </Item>
    </Wrapper>
  );
}
export default Banner;
