import ReactStars from 'react-stars';
import styled from 'styled-components';
import { IMovie } from '../../services/movieApi';
import { getYear } from '../../utils/utils';

const Wrapper = styled.div`
  margin-bottom: 10px;
  padding-left: 16px;
  padding-bottom: 10px;

  @media only screen and (max-width: 960px) {
    width: 75%;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    margin-top: 10px;
    background-color: ${(props) => props.theme.color.black.middle};
    border-radius: 4px;
    padding: 16px;
  }
`;

const Title = styled.div`
  margin-bottom: 10px;

  h2 {
    font-size: ${props => props.theme.fontSizePx['4xl']};
    font-weight: 700;
  }

  h3 {
    font-weight: 700;
    font-size: ${props => props.theme.fontSizePx.l};
  }
`;

const Info = styled.ul`
  display: flex;

  li {
    position: relative;
    font-size: ${props => props.theme.fontSizePx.s};
  }

  li ~ li {
    padding-left: 15px;
    margin-left: 12px;
  }

  li.averageStar {
    display: flex;
    gap: 4px;
    align-items: center;
  }

  li ~ li:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.color.white.dark};
  }
`;

function DetailInfo({ movieData }: { movieData: IMovie }) {
  return (
    <Wrapper>
      <Title>
        <h2>{movieData?.title}</h2>
        <h3>{movieData?.original_title}</h3>
      </Title>
      <Info>
        <li>{getYear(movieData?.release_date)}</li>
        <li>{movieData?.runtime}분</li>
        {movieData?.genres && (
          <li>
            {movieData?.genres.map((genre, i) => {
              if (movieData?.genres && i === movieData?.genres.length - 1) {
                return <span key={genre.name}>{genre.name}</span>;
              } else {
                return <span key={genre.name}>{genre.name}, </span>;
              }
            })}
          </li>
        )}
        <li className='averageStar'>
          평균
          <ReactStars count={1} color1='#FFCC33' size={14} edit={false} />
          <span className='ratingValue'>{movieData?.vote_average.toFixed(1)}</span>
        </li>
      </Info>
    </Wrapper>
  );
}

export default DetailInfo;
