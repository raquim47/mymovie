import { useParams } from 'react-router-dom';
import Modal from './modal';
import Styled from './styled';
import ReactStars from 'react-stars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { useGetMovieDetail } from 'hooks/useGetMovieDetail';
import { getMovieImagePath } from 'components/movies/utils';

const MovieDetail = () => {
  const { movieId } = useParams();
  const { data, isLoading, error } = useGetMovieDetail(Number(movieId!));
  return (
    <Modal>
      {isLoading && <p>Loading...</p>}
      {!isLoading && error ? (
        <p>error</p>
      ) : (
        data && (
          <Styled.Content>
            <Styled.Top>
              <img
                className="backdrop"
                src={getMovieImagePath(data, 'backdrop', 'w1280')}
              />
              <Styled.Header>
                <Styled.Info>
                  <h2>{data?.title}</h2>
                  <h3>{data?.original_title}</h3>
                  <ul>
                    <li>{data?.release_date}</li>
                    <li>{data?.runtime} 분</li>
                    <li className="genres">
                      {data?.genres?.map((genre) => (
                        <span key={genre.id}>{genre.name}</span>
                      ))}
                    </li>
                  </ul>
                </Styled.Info>
                <img className="poster" src={getMovieImagePath(data, 'poster', 'w500')} />
              </Styled.Header>
            </Styled.Top>
            <Styled.Bottom>
              <Styled.Options>
                <h3 className="sr-only">사용자 옵션</h3>
                <ul>
                  <li>
                    <button className="option-btn">
                      <ReactStars
                        count={5}
                        color1="#E6E6E6"
                        color2="#FFCC33"
                        half
                        size={28}
                        edit={true}
                      />
                    </button>
                    평가하기
                  </li>
                  <li>
                    <button className="option-btn">
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                    찜하기
                  </li>
                  <li>
                    <button className="option-btn">
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    코멘트 남기기
                  </li>
                </ul>
              </Styled.Options>
              <Styled.Summary>
                <h3 className="sr-only">줄거리 소개</h3>
                {data?.tagline && <h4>{data.tagline}</h4>}
                <p>{data?.overview}</p>
              </Styled.Summary>
            </Styled.Bottom>
          </Styled.Content>
        )
      )}
    </Modal>
  );
};

export default MovieDetail;
