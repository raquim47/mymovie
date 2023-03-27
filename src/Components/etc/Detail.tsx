import { motion } from 'framer-motion';
import ReactStars from 'react-stars';
import { useMatch, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faHeart as faHeartFill,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { useQuery } from 'react-query';
import { getMovieDetail, IMovie } from '../../services/movieApi';
import { makeImagePath, rateMassage } from '../../utils/utils';
import { useEffect, useState } from 'react';
import {
  checkIsFavorite,
  handleFavoriteList,
  handleRatedList,
  checkMyRate,
  saveOnRatings,
  getRatings,
  getUsersInfo,
} from '../../services/fbaseFunc';
import { Timestamp } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import UserItem from './UserItem';

const GlobalStyle = createGlobalStyle<{ isScroll: boolean }>`
  body {
    overflow: hidden; 
    padding-right: ${(props) => (props.isScroll ? '6px' : 0)};
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

const Wrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 70vw;
  max-width: 900px;
  height: 75vh;
  margin: auto;
  overflow: hidden;
  padding-bottom: 30px;
  border-radius: 25px;
  background-color: ${(props) => props.theme.black.lighter};
  z-index: 100;

  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

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

const Content = styled(motion.div)`
  position: relative;
  height: 100%;
  color: ${(props) => props.theme.white.white};
  overflow: auto;

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
// ContentTop
const ContentTop = styled.section`
  position: relative;
  height: 380px;

  @media only screen and (max-width: 768px) {
    height: auto;
    margin-bottom: 10px;
  }
`;

const ContentTopBg = styled.div<{ $bgPhoto: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;

  @media only screen and (max-width: 768px) {
    position: relative;
    height: 350px;
  }
`;

const ContentTopInner = styled.div`
  position: absolute;
  bottom: -85px;
  width: 100%;
  padding-left: calc(30% + 40px);
  padding-right: 30px;

  @media only screen and (max-width: 960px) {
    padding-left: 30px;
  }

  @media only screen and (max-width: 768px) {
    position: relative;
    bottom: 0;
    padding: 10px 20px 0;
  }
`;

const Poster = styled.div`
  position: absolute;
  left: 30px;
  bottom: 0;
  width: 30%;
  border-radius: 4px;
  overflow: hidden;
  img {
    display: block;
    width: 100%;
  }

  @media only screen and (max-width: 960px) {
    left: auto;
    right: 30px;
    bottom: 95px;
    width: 20%;
  }

  @media only screen and (max-width: 768px) {
    right: 50%;
    transform: translateX(50%);
    min-width: 120px;
    bottom: calc(100% + 30px);
  }
`;

const Head = styled.div`
  margin-bottom: 10px;
  padding-left: 16px;
  padding-bottom: 10px;

  @media only screen and (max-width: 960px) {
    width: 75%;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    margin-top: 10px;
    background-color: ${(props) => props.theme.black.middle};
    border-radius: 4px;
    padding: 16px;
  }
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

const Option = styled.ul<{ isFavorite: boolean }>`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.black.middle};
  border-radius: 4px;
  padding: 10px 0;
  height: 75px;

  li {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 12px;
    padding: 0 4%;
  }

  li ~ li {
    position: relative;

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

  .detailOptionIcon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    cursor: pointer;
    font-size: 24px;
  }

  .heart {
    color: ${(props) => (props.isFavorite ? props.theme.purple : 'inherit')};
  }
`;

// ContentMiddle
const ContentMiddle = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  margin-top: 95px;
  padding: 0 30px 20px;

  @media only screen and (max-width: 768px) {
    margin-top: 0;
    padding: 0 20px 20px;
  }
`;

const Commented = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 16px;
  background-color: ${(props) => props.theme.black.middle};

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
    font-size: 14px;
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
  border-radius: 4px;
  padding: 16px;
  background-color: ${(props) => props.theme.black.middle};

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

interface IDetail {
  movieId: number;
  keyword?: string;
}
export interface IRating {
  uid: string;
  rating: number;
  timestamp?: Timestamp;
}

export interface IUserInfo {
  nickName: string;
  userPhoto: string;
  rating?: number;
}
function Detail({ movieId, keyword }: IDetail) {
  const [ratings, setRatings] = useState<IRating[]>([]);
  const [usersInfo, setUsersInfo] = useState<any[]>([]);
  useEffect(() => {
    const unsubscribe = getRatings(movieId, (data) => {
      setRatings(data);
      // data가 변경될 때마다 사용자 정보를 업데이트
      data.forEach(async ({ uid, rating }: { uid: string; rating: number }) => {
        const userInfo = await getUsersInfo(uid, rating);
        setUsersInfo((prev) => [...prev, userInfo]);
      });
    });

    return () => {
      // 컴포넌트가 언마운트될 때 구독 취소
      unsubscribe();
    };
  }, [movieId]);
  console.log(ratings, usersInfo);
  const isScroll = window.innerHeight < document.body.clientHeight;
  const [isFavorite, setIsfavorite] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.init.isLoggedIn);
  const [myRate, setMyrate] = useState(0);
  const favoriteMovie = useSelector(
    (state: RootState) => state.userData?.favoriteMovie
  );
  const ratedMovie = useSelector(
    (state: RootState) => state.userData?.ratedMovie
  );
  const navigate = useNavigate();
  const detailMatch = useMatch(`/:page/:listType/:movieId`);
  const favoriteMatch = useMatch(`/favorite/:listType/:movieId`);
  const rateMatch = useMatch(`/rate/:listType/:movieId`);
  // Overay클릭했을 때 popup 닫고 경로 이동
  const closeDetail = () => {
    if (!detailMatch) return;
    if (keyword) {
      navigate(`/${detailMatch?.params.page}/?keyword=${keyword}`);
    } else {
      navigate(`/${detailMatch?.params.page}`);
    }
  };
  // useQuery
  const { data, isLoading, isError } = useQuery<IMovie>(
    ['movieDetail', movieId],
    () => getMovieDetail(movieId)
  );
  // 별점 매기기 눌렀을 때
  const onChangeStars = (rate: number) => {
    if (!data) return;
    if (!isLoggedIn) {
      alert('로그인 후 이용해주세요');
      return;
    }
    const genre_ids = data?.genres ? data?.genres.map((m) => m.id) : [];
    const ratedMovieData = {
      id: movieId,
      title: data.title,
      poster_path: data.poster_path,
      vote_average: data.vote_average,
      genre_ids,
      myRate: rate,
    };
    handleRatedList(ratedMovieData, rate === myRate);
    saveOnRatings(movieId, rate, rate === myRate);
    if (rate === myRate) {
      alert('별점 취소');
      if (rateMatch) {
        navigate('/rate');
      }
    } else {
      alert('별점 등록');
    }
  };
  // '보고 싶어요' 눌렀을 때
  const onClickHeart = () => {
    if (!data) return;
    if (!isLoggedIn) {
      alert('로그인 후 이용해주세요');
      return;
    }
    // 삭제와 동시에 navigate
    if (isFavorite && favoriteMatch) {
      navigate('/favorite');
    }
    const genre_ids = data?.genres ? data?.genres.map((m) => m.id) : [];
    const favoriteMovieData = {
      id: movieId,
      title: data.title,
      poster_path: data.poster_path,
      vote_average: data.vote_average,
      genre_ids,
    };
    handleFavoriteList(favoriteMovieData);
  };
  // movieId의 ratedMovie 확인해서 isFavorite에 반영
  useEffect(() => {
    if (!isLoggedIn || !ratedMovie) return;
    const rate = checkMyRate(movieId, ratedMovie);
    setMyrate(rate);
  }, [movieId, ratedMovie]);
  // movieId의 favorite을 확인해서 isFavorite에 반영
  useEffect(() => {
    if (!isLoggedIn || !favoriteMovie) return;
    const isFavorite = checkIsFavorite(movieId, favoriteMovie);
    setIsfavorite(isFavorite);
  }, [movieId, favoriteMovie]);
  return (
    <>
      <GlobalStyle isScroll={isScroll} />
      <Overlay
        onClick={closeDetail}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <Wrapper
        layoutId={`${detailMatch?.params.listType}${movieId}`}
        transition={{ type: 'easeInOut', duration: 0.4 }}
      >
        {isLoading ? (
          <p>loading...</p>
        ) : (
          <Content>
            <ContentTop>
              <ContentTopBg
                $bgPhoto={
                  data?.backdrop_path
                    ? makeImagePath(data.backdrop_path, 'w1280')
                    : ''
                }
              ></ContentTopBg>
              <ContentTopInner>
                <Poster>
                  <img
                    src={makeImagePath(
                      data?.poster_path || '../assets/no-image-icon-6.png',
                      'w500'
                    )}
                    alt={data?.title}
                  />
                </Poster>
                <Head>
                  <Title>
                    <h2>{data?.title}</h2>
                    <h3>{data?.original_title}</h3>
                  </Title>
                  <Info>
                    <li>{getYear(data?.release_date)}</li>
                    <li>{data?.runtime}분</li>
                    {data?.genres && (
                      <li>
                        {data?.genres.map((genre, i) => {
                          if (data?.genres && i === data?.genres.length - 1) {
                            return <span key={genre.name}>{genre.name}</span>;
                          } else {
                            return <span key={genre.name}>{genre.name}, </span>;
                          }
                        })}
                      </li>
                    )}
                    <li className='averageStar'>
                      평균
                      <ReactStars
                        count={1}
                        color1='#FFCC33'
                        size={14}
                        edit={false}
                      />
                      <span className='ratingValue'>
                        {data?.vote_average.toFixed(1)}
                      </span>
                    </li>
                  </Info>
                </Head>
                <Option isFavorite={isFavorite}>
                  <li>
                    <ReactStars
                      onChange={(rate) => onChangeStars(rate)}
                      count={5}
                      color1='#E6E6E6'
                      color2='#FFCC33'
                      half
                      size={30}
                      edit={true}
                      className='detailOptionIcon'
                      value={myRate}
                    />
                    <em>{rateMassage[myRate]}</em>
                  </li>
                  <li className='heart'>
                    <div className='detailOptionIcon' onClick={onClickHeart}>
                      {!isFavorite ? (
                        <FontAwesomeIcon icon={faHeart} />
                      ) : (
                        <FontAwesomeIcon icon={faHeartFill} />
                      )}
                    </div>
                    <em>보고싶어요</em>
                  </li>
                  <li>
                    <div className='detailOptionIcon'>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </div>
                    <em>코멘트 남기기</em>
                  </li>
                </Option>
              </ContentTopInner>
            </ContentTop>
            <ContentMiddle>
              <Commented>
                <div className='profile'></div>
                <p>
                  코멘트 남기는 곳 코멘트 남기는 곳코멘트 남기는 곳 코멘트
                  남기는 곳코멘트 남기는 곳 코멘트 남기는 곳
                </p>
                <div className='edit'>
                  <span>수정</span>
                  <span>삭제</span>
                </div>
              </Commented>
              {data?.overview ? (
                <OverView>
                  {data?.tagline ? <h5>{data.tagline}</h5> : null}
                  <p>{data?.overview}</p>
                </OverView>
              ) : null}
              {usersInfo.map((info, i) => (
                <UserItem key={i} nickName={info.nickName} userPhoto={info.userPhoto} rating={info.rating} />
              ))}
            </ContentMiddle>
          </Content>
        )}
        <FontAwesomeIcon
          onClick={closeDetail}
          icon={faXmark}
          className='closeBtn'
        />
      </Wrapper>
    </>
  );
}

export default Detail;
