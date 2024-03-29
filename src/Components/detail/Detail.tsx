import { useMatch, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from 'react-query';
import { getMovieDetail, IMovie } from '../../services/movieApi';
import { makeImagePath } from '../../utils/utils';
import { useEffect, useState } from 'react';
import { getRatingUsers } from '../../services/fbaseFunc';
import { useSelector } from 'react-redux';
import { IRatingUsers, RootState } from '../../store';
import UserItem from '../auth/UserItem';
import {
  GlobalStyle,
  DarkBox,
  Overlay,
  Wrapper,
  Content,
  ContentBg,
  DetailPoster,
  ContentTop,
  ContentBottom,
  OverView,
  RatingUsers,
} from './DetailStyles';
import DetailInfo from './DetailInfo';
import DetailOption from './DetailOption';
import DetailCommentForm from './DetailCommentForm';
import Loader from '../etc/Loader';

interface IDetail {
  movieId: number;
  keyword?: string;
}

function Detail({ movieId, keyword }: IDetail) {
  const navigate = useNavigate();
  const detailMatch = useMatch(`/:page/:listType/:movieId`);
  const isScroll =
    window.innerWidth > 768
      ? window.innerHeight < document.body.clientHeight
      : false;
  const isLoggedIn = useSelector((state: RootState) => state.init.isLoggedIn);
  const ratedMovies = useSelector(
    (state: RootState) => state.userData?.ratedMovies
  );
  const [myRate, setmyRate] = useState(0);
  const [myComment, setMyComment] = useState('');
  const [commentFormOpen, setCommentFormOpen] = useState(false);
  const [ratingUsers, setRatingUsers] = useState<IRatingUsers[]>([]);

  // myRate, myComment 갱신
  useEffect(() => {
    if (!isLoggedIn || !ratedMovies) return;
    if (!ratedMovies[movieId]) {
      setmyRate(0);
      setMyComment('');
    } else {
      setmyRate(ratedMovies[movieId].rate);
      setMyComment(ratedMovies[movieId].comment || '');
    }
  }, [isLoggedIn, ratedMovies, movieId]);
  // ratingUsers 갱신
  useEffect(() => {
    (async () => {
      const ratingUsersData = await getRatingUsers(movieId);
      setRatingUsers(ratingUsersData);
    })();
  }, [movieId, myRate, myComment]);
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
  const { data: movieData, isLoading } = useQuery<IMovie>(
    ['movieDetail', movieId],
    () => getMovieDetail(movieId)
  );
  // 코멘트 입력창 열기/닫기
  const toggleCommentForm = () => {
    if (!isLoggedIn) {
      alert('로그인 후 이용해주세요');
      return;
    }
    if (!myRate) {
      alert('영화에 대한 별점을 먼저 입력해주세요');
      return;
    }
    setCommentFormOpen((prev) => !prev);
  };

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
          <Loader />
        ) : (
          <Content>
            <ContentBg
              $bgPhoto={
                movieData?.backdrop_path
                  ? makeImagePath(movieData.backdrop_path, 'w1280')
                  : ''
              }
            ></ContentBg>
            <ContentTop>
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
              <DarkBox>
                <DetailOption
                  movieData={movieData as IMovie}
                  toggleCommentForm={toggleCommentForm}
                  myRate={myRate}
                  myComment={myComment}
                />
              </DarkBox>
            </ContentTop>
            <ContentBottom>
              {(commentFormOpen || myComment) && (
                <DarkBox>
                  <DetailCommentForm
                    commentFormOpen={commentFormOpen}
                    movieData={movieData as IMovie}
                    myRate={myRate}
                    myComment={myComment}
                    toggleCommentForm={toggleCommentForm}
                  />
                </DarkBox>
              )}
              {movieData?.overview && (
                <DarkBox>
                  <OverView>
                    {movieData?.tagline ? <h5>{movieData.tagline}</h5> : null}
                    <p>{movieData?.overview}</p>
                  </OverView>
                </DarkBox>
              )}
              {ratingUsers.length > 0 && (
                <DarkBox>
                  {ratingUsers.map((user, i) => (
                    <RatingUsers key={i}>
                      <UserItem
                        userPhoto={user.userPhoto}
                        nickName={user.nickName}
                        rate={user.rate}
                        comment={user.comment}
                      />
                    </RatingUsers>
                  ))}
                </DarkBox>
              )}
            </ContentBottom>
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
