import { AnimatePresence, motion } from 'framer-motion';
import ReactStars from 'react-stars';
import { useMatch, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
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
    top: 16px;
    right: 20px;
    width: 20px;
    height: 20px;
    transition: all 0.3s ease-in-out;
    color: white;
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

const BoxBg = styled.div<{ $bgPhoto: string }>`
  position: relative;
  width: 100%;
  height: 350px;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
`;

const Content = styled.div`
  padding: 0 30px 30px;

  article.contentHead {
    display: flex;
    align-items: flex-end;
    position: relative;
    margin-top: -102px;
    margin-bottom: 10px;
    padding-left: 30%;
  }

  article.contentMiddle {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const Poster = styled.div`
  position: absolute;
  left: 0;
  width: 30%;
  border-radius: 4px;
  overflow: hidden;
  img {
    display: block;
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

const ContentTop = styled.div`
  flex: 1;
  margin-left: 10px;
`;

const ContentItem = styled.div`
  padding: 16px;
  background-color: ${(props) => props.theme.black.middle};
  border-radius: 4px;
`;

const ContentItemHead = styled.div`
  height: 102px;
  margin-bottom: 10px;
  padding-left: 16px;
  padding-bottom: 10px;
  background-color: transparent;
`;

const Title = styled.div`
  margin-bottom: 10px;

  h2 {
    font-size: 36px;
    font-weight: 700;
  }

  h3 {
    font-weight: 700;
    font-size: 18px;
  }
`;

const Info = styled.ul`
  display: flex;

  li {
    position: relative;
    font-size: 14px;
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
    background-color: ${(props) => props.theme.white.darker};
  }
`;

const Option = styled.ul`
  display: flex;
  font-size: 12px;

  .detailOptionIcon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    cursor: pointer;
  }

  li {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  li ~ li {
    position: relative;
    padding-left: 20px;
    margin-left: 20px;

    ::before {
      position: absolute;
      top: 50%;
      right: 100%;
      transform: translateY(-50%);
      width: 1px;
      height: 80%;
      background-color: ${(props) => props.theme.white.darker};
      content: '';
    }
  }

  svg {
    font-size: 24px;
  }
`;

const Commented = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;

  .profile {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.white.white};
    margin-right: 20px;
  }

  p {
    width: 70%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .edit {
    display: flex;
    gap: 10px;
    margin-left: auto;
    margin-right: 0;
    font-size: 12px;
  }
`;
const OverView = styled.div`
  h5 {
    position: relative;
    margin-bottom: 16px;
    padding-left: 10px;
    font-size: 14px;
    :before {
      content: '';
      position: absolute;
      width: 2px;
      height: 10px;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background-color: white;
    }
  }
  p {
    font-size: 14px;
    line-height: 1.4;
    word-break: keep-all;
  }
`;

const getYear = (date?: string) => {
  if (date) return date.split('-')[0];
  return '';
};

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
  return (
    <>
      <GlobalStyle />
      <Overlay onClick={closeDetail} animate={{ opacity: 1 }} />
      <Wrapper
        layoutId={`${detailMatch?.params.slideName}${detailMatch?.params.videoId}`}
        transition={{ type: 'tween', duration: 0.2 }}
      >
        <Box>
          <BoxBg
            $bgPhoto={
              data?.backdrop_path
                ? makeImagePath(data.backdrop_path, 'w1280')
                : ''
            }
          />
          <Content>
            <article className="contentHead">
              <Poster>
                <img
                  src={makeImagePath(
                    data?.poster_path || '../assets/no-image-icon-6.png',
                    'w500'
                  )}
                  alt={data?.title}
                />
              </Poster>
              <ContentTop>
                <ContentItemHead>
                  <Title>
                    <h2>{data?.title}</h2>
                    <h3>{data?.original_title}</h3>
                  </Title>
                  <Info>
                    <li>{getYear(data?.release_date)}</li>
                    <li>{data?.runtime}분</li>
                    <li>
                      {data?.genres.map((genre, i) => {
                        if (i === data?.genres.length - 1) {
                          return <span key={genre.name}>{genre.name}</span>;
                        } else {
                          return <span key={genre.name}>{genre.name}, </span>;
                        }
                      })}
                    </li>
                    <li className="averageStar">
                      평균
                      <ReactStars
                        count={1}
                        color1="#FFCC33"
                        size={14}
                        edit={false}
                      />
                      <span className="ratingValue">
                        {data?.vote_average.toFixed(1)}
                      </span>
                    </li>
                  </Info>
                </ContentItemHead>
                <ContentItem>
                  <Option>
                    <li className="myStar">
                      <ReactStars
                        count={5}
                        color1="#E6E6E6"
                        color2="#FFCC33"
                        half
                        size={30}
                        edit={true}
                        className="detailOptionIcon"
                      />
                      <em>평가하기</em>
                    </li>
                    <li>
                      <div className="detailOptionIcon">
                        <FontAwesomeIcon icon={faHeart} />
                      </div>
                      <em>보고싶어요</em>
                    </li>
                    <li>
                      <div className="detailOptionIcon">
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </div>
                      <em>코멘트 남기기</em>
                    </li>
                  </Option>
                </ContentItem>
              </ContentTop>
            </article>
            <article className="contentMiddle">
              <ContentItem>
                <Commented>
                  <div className="profile"></div>
                  <p>
                    코멘트 남기는 곳 코멘트 남기는 곳코멘트 남기는 곳 코멘트
                    남기는 곳코멘트 남기는 곳 코멘트 남기는 곳
                  </p>
                  <div className="edit">
                    <span>수정</span>
                    <span>삭제</span>
                  </div>
                </Commented>
              </ContentItem>
              <ContentItem>
                <OverView>
                  {data?.tagline ? <h5>{data.tagline}</h5> : null}
                  <p>{data?.overview}</p>
                </OverView>
              </ContentItem>
            </article>
          </Content>
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
