import { useMatch, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { useQuery } from 'react-query';
import { getMovieDetail, IMovie } from '../../services/movieApi';
import { makeImagePath } from '../../utils/utils';
import { useEffect, useState } from 'react';
import {
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
  DetailPoster,
  ContentMiddle,
  OverView,
  Ratings,
  UserItemWrapper,
} from './StyleDetail';
import DetailInfo from './DetailInfo';
import DetailOption from './DetailOption';

interface IDetail {
  movieId: number;
  keyword?: string;
}
export interface IRating {
  uid: string;
  rating: number;
  timestamp?: Timestamp;
  comment?: string;
}

export interface IUserInfo {
  nickName: string;
  userPhoto: string;
  rating?: number;
  comment?: string;
}
function Detail({ movieId, keyword }: IDetail) {
  const isLoggedIn = useSelector((state: RootState) => state.init.isLoggedIn);
  const isScroll = window.innerHeight < document.body.clientHeight;
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
  
  
  
  
  const [myComment, setMyComment] = useState('');
  const [commentOpen, setCommentOpen] = useState(false);
 
  
  const navigate = useNavigate();
  const detailMatch = useMatch(`/:page/:listType/:movieId`);

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
  const {
    data: movieData,
    isLoading,
  } = useQuery<IMovie>(['movieDetail', movieId], () => getMovieDetail(movieId));

  // 코멘트 입력창 열기/닫기
  const toggleComment = () => {
    if (!isLoggedIn) {
      alert('로그인 후 이용해주세요');
      return;
    }
    setCommentOpen((prev) => !prev);
  };
  // 코멘트 눌렀을 때
  // const handleCommentValid = ({ comment }: { comment: string }) => {
  //   if (!movieData) return;

  //   const genre_ids = movieData?.genres
  //     ? movieData?.genres.map((m) => m.id)
  //     : [];
  //   const ratedMovieData = {
  //     id: movieId,
  //     title: movieData.title,
  //     poster_path: movieData.poster_path,
  //     vote_average: movieData.vote_average,
  //     genre_ids,
  //     myRate,
  //     myComment: comment,
  //   };
  //   handleCommentya(ratedMovieData);
  //   saveOnComment(movieId, comment);
  //   setCommentOpen(false);
  // };

  
  
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
                  movieData?.backdrop_path
                    ? makeImagePath(movieData.backdrop_path, 'w1280')
                    : ''
                }
              ></ContentTopBg>
              <ContentTopInner>
                <DetailPoster>
                  <img
                    src={makeImagePath(
                      movieData?.poster_path || '../assets/no-image-icon-6.png',
                      'w500'
                    )}
                    alt={movieData?.title}
                  />
                </DetailPoster>
                <DetailInfo movieData={movieData as IMovie} />
                <DetailOption
                  movieData={movieData as IMovie}
                  toggleComment={toggleComment}
                  myComment={myComment}
                />
              </ContentTopInner>
            </ContentTop>
            <ContentMiddle>
              {/* {commentOpen ? (
                <CommentWrapper>
                  <CommentForm onSubmit={handleSubmit(handleCommentValid)}>
                    <textarea
                      {...register('comment', {
                        required: '코멘트를 입력해주세요',
                      })}
                      defaultValue={myComment}
                      placeholder='작품에 대한 코멘트를 남겨주세요'
                    />
                    {errors.comment && <span className='comment_error'>{errors.comment.message}</span>}
                    <div className='comment_edit'>
                      <button type='submit'>저장</button>
                      <button onClick={toggleComment}>취소</button>
                    </div>
                  </CommentForm>
                </CommentWrapper>
              ) : (
                myComment && (
                  <CommentWrapper>
                    <PostedComment>
                      <h4>나의 코멘트</h4>
                      <p>{myComment}</p>
                      <div className='comment_edit'>
                        <button onClick={toggleComment}>수정</button>
                        <button onClick={() => deleteComment(movieId)}>
                          삭제
                        </button>
                      </div>
                    </PostedComment>
                  </CommentWrapper>
                )
              )} */}

              {movieData?.overview ? (
                <OverView>
                  {movieData?.tagline ? <h5>{movieData.tagline}</h5> : null}
                  <p>{movieData?.overview}</p>
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
