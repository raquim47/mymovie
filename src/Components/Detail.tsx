import { AnimatePresence, motion } from 'framer-motion';
import ReactStars from 'react-stars';
import { useMatch, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from 'react-query';
import { getMovieDetail, IVideo } from '../api';
import { makeImagePath } from '../utils';

const GlobalStyle = createGlobalStyle`
  body { overflow: hidden; }
`;
const Wrapper = styled(motion.div)`
  position: fixed;
  min-width: 768px;
  width: 50vw;
  max-width: 1280px;
  height: 75vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 100;

  .closeBtn {
    position: absolute;
    top: 20px;
    right: 30px;
    width: 25px;
    height: 25px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    :hover {
      scale: 1.3;
    }
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  z-index: 100;
`;

const Box = styled(motion.div)`
  border-radius: 25px;
  height: 100%;
  overflow: auto;
  background-color: ${(props) => props.theme.black.lighter};
  color: ${(props) => props.theme.white.white};

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #4e4e4e;
    border-radius: 100px;
  }
  ::-webkit-scrollbar-track {
    background-color: #4e4e4e;
    border-radius: 100px;
    background-clip: padding-box;
    border: 3px solid transparent;
  }
`;

const DetailBg = styled.div<{ $bgPhoto: string }>`
  position: relative;
  width: 100%;
  height: 350px;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
`;

const DetailContent = styled.div`
  display: flex;
  position: relative;
  padding: 0 64px;
`;

const DetailPoster = styled.div`
  width: 30%;
  margin-top: -150px;
  img {
    width: 100%;
  }
  @media only screen and (max-width: 700px) {
    margin: 0;
    width: 100%;
    text-align: center;
    img {
      width: 50%;
      min-width: 200px;
      margin: 0 auto;
    }
  }
`;

const DetailTxtCnt = styled.div`
  position: relative;
  width: 70%;
  border: 1px solid red;
  padding-left: 20px;
`;

const DetailTitle = styled.div`
  position: absolute;
  left: 20px;
  bottom: calc(100% + 20px);
  font-weight: 700;

  h2 {
    font-size: 36px;
  }

  h3 {
    font-size: 18px;
  }
`;
const DetailInfo = styled.ul`
  padding-top: 20px;
  border: 1px solid red;
  display: flex;
  gap: 12px;
  li {
    font-size: 16px;
  }
`;
function Detail() {
  const navigate = useNavigate();
  const closeDetail = () => {
    navigate(-1);
  };
  const detailMatch = useMatch(`/movie/:slideName/:videoId`);
  const { data, isLoading, error } = useQuery<IVideo>(
    ['movieDetail', detailMatch?.params.videoId],
    () => getMovieDetail(Number(detailMatch?.params.videoId))
  );
  console.log(data);
  return (
    <>
      <GlobalStyle />
      <Overlay onClick={closeDetail} animate={{ opacity: 1 }} />
      <Wrapper
        layoutId={`${detailMatch?.params.slideName}${detailMatch?.params.videoId}`}
        transition={{ type: 'tween', duration: 0.2 }}
      >
        <Box>
          <DetailBg
            $bgPhoto={
              data?.backdrop_path
                ? makeImagePath(data.backdrop_path, 'w1280')
                : ''
            }
          />
          <DetailContent>
            <DetailPoster>
              <img
                src={makeImagePath(
                  data?.poster_path || '../assets/no-image-icon-6.png',
                  'w500'
                )}
                alt={data?.title}
              />
            </DetailPoster>
            <DetailTxtCnt>
              <DetailTitle>
                <h2>{data?.title}</h2>
                <h3>{data?.original_title}</h3>
              </DetailTitle>
              <DetailInfo>
                <li>{data?.release_date}</li>
                <li>{data?.runtime}M</li>
                <li>
                  {data?.genres.map((genre, i) => {
                    if (i === data?.genres.length - 1) {
                      return <span>{genre.name}</span>;
                    } else {
                      return <span>{genre.name}, </span>;
                    }
                  })}
                </li>
                <li>
                  평균:
                  <ReactStars
                    count={5}
                    value={data?.vote_average ? data?.vote_average / 2 : 0}
                    color1="#E6E6E6"
                    color2="#FFCC33"
                    half
                    size={35}
                    edit={false}
                    className="rating"
                  />
                  <span className="ratingValue">
                    ({data?.vote_average.toFixed(1)})
                  </span>
                </li>
              </DetailInfo>
            </DetailTxtCnt>
          </DetailContent>
        </Box>
        <FontAwesomeIcon
          onClick={closeDetail}
          icon={faXmark}
          className="closeBtn"
        />
      </Wrapper>
    </>
  );
}

export default Detail;
