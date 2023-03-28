import ReactStars from 'react-stars';
import { useMatch, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faHeart as faHeartFill,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { useQuery } from 'react-query';
import { getMovieDetail, IMovie } from '../../services/movieApi';
import { getYear, makeImagePath, rateMassage } from '../../utils/utils';
import { useEffect, useState } from 'react';
import {
  checkIsFavorite,
  handleFavoriteList,
  handleRatedList,
  checkMyRate,
  saveOnRatings,
  getRatings,
  getUsersInfo,
  saveOnComment,
  handleCommentya,
  deleteComment,
} from '../../services/fbaseFunc';
import { Timestamp } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import UserItem from '../etc/UserItem';
import { useForm } from 'react-hook-form';
import {
  GlobalStyle,
  Overlay,
  Wrapper,
  Content,
  ContentTop,
  ContentTopBg,
  ContentTopInner,
  Poster,
  Head,
  Title,
  Info,
  Option,
  ContentMiddle,
  Commented,
  OverView,
  Ratings,
  CommentForm,
  UserItemWrapper,
} from './StyleDetail';

interface IDetail {
  movieId: number;
  keyword?: string;
}
export interface IRating {
  uid: string;
  rating: number;
  timestamp?: Timestamp;
  comment?:string;
}

export interface IUserInfo {
  nickName: string;
  userPhoto: string;
  rating?: number;
  comment?: string;
}
function Detail({ movieId, keyword }: IDetail) {
  const [usersInfo, setUsersInfo] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = getRatings(movieId, (data) => {
      console.log(data);
      // Promise.all을 사용하여 모든 Promise가 resolve 될 때까지 기다리고 한 번에 setUsersInfo를 호출
      Promise.all(
        data.map(
          async ({
            uid,
            rating,
            comment,
          }: {
            uid: string;
            rating: number;
            comment: string;
          }) => {
            const userInfo = await getUsersInfo(uid, rating, comment);
            return userInfo;
          }
        )
      ).then((userInfoArr) => {
        const sortedUserInfoArr = userInfoArr.sort(
          (a, b) => b.timestamp - a.timestamp
        );
        setUsersInfo(sortedUserInfoArr);
      });
    });
    return () => {
      // 컴포넌트가 언마운트될 때 구독 취소
      unsubscribe();
    };
  }, [movieId]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ comment: string }>({ mode: 'onChange' });
  const isScroll = window.innerHeight < document.body.clientHeight;
  const [isFavorite, setIsfavorite] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.init.isLoggedIn);
  const [myRate, setMyrate] = useState(0);
  const [myComment, setMyComment] = useState('');
  const [commentOpen, setCommentOpen] = useState(false);
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
      myComment,
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
  // 코멘트 입력창 열기/닫기
  const toggleComment = () => {
    if (!isLoggedIn) {
      alert('로그인 후 이용해주세요');
      return;
    }
    setCommentOpen((prev) => !prev);
  };
  // 코멘트 눌렀을 때
  const handleCommentValid = ({ comment }: { comment: string }) => {
    if (!data) return;

    const genre_ids = data?.genres ? data?.genres.map((m) => m.id) : [];
    const ratedMovieData = {
      id: movieId,
      title: data.title,
      poster_path: data.poster_path,
      vote_average: data.vote_average,
      genre_ids,
      myRate,
      myComment: comment,
    };
    handleCommentya(ratedMovieData);
    saveOnComment(movieId, comment);
    setCommentOpen(false);
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
    const { myRate, myComment } = checkMyRate(movieId, ratedMovie);
    console.log(myComment);
    setMyrate(myRate);
    setMyComment(myComment);
  }, [movieId, ratedMovie]);
  // movieId의 favorite을 확인해서 isFavorite에 반영
  useEffect(() => {
    if (!isLoggedIn || !favoriteMovie) return;
    const isFavorite = checkIsFavorite(movieId, favoriteMovie);
    setIsfavorite(isFavorite);
  }, [movieId, favoriteMovie]);
  console.log(myComment, myRate, usersInfo);
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
                    <div className='detailOptionIcon' onClick={toggleComment}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </div>
                    <em>코멘트 남기기</em>
                  </li>
                </Option>
              </ContentTopInner>
            </ContentTop>
            <ContentMiddle>
              {myComment && !commentOpen && (
                <Commented>
                  <h5>나의 코멘트</h5>
                  <p>{myComment}</p>
                  <div className='edit'>
                    <button onClick={toggleComment}>수정</button>
                    <button onClick={() => deleteComment(movieId)}>삭제</button>
                  </div>
                </Commented>
              )}
              {commentOpen && (
                <Commented>
                  <CommentForm onSubmit={handleSubmit(handleCommentValid)}>
                    <textarea
                      {...register('comment', {
                        required: '코멘트를 입력해주세요',
                      })}
                      placeholder='작품에 대한 코멘트를 남겨주세요'
                    />
                    <div className='btns'>
                      <button type='submit'>저장</button>
                      <button onClick={toggleComment}>취소</button>
                    </div>
                  </CommentForm>
                </Commented>
              )}
              {data?.overview ? (
                <OverView>
                  {data?.tagline ? <h5>{data.tagline}</h5> : null}
                  <p>{data?.overview}</p>
                </OverView>
              ) : null}
              <Ratings>
                {usersInfo.map((info, i) => (
                  <UserItemWrapper key={i}>
                    <UserItem
                      nickName={info.nickName}
                      userPhoto={info.userPhoto}
                      rating={info.rating}
                      comment={info.comment}
                    />
                  </UserItemWrapper>
                ))}
              </Ratings>
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
