import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import ReactStars from 'react-stars';
import styled from 'styled-components';
import { handleRatedList, saveOnRatings } from '../../services/fbaseFunc';
import { IMovie } from '../../services/movieApi';
import { RootState } from '../../store';
import { rateMassage } from '../../utils/utils';
import DetailOptionFavorite from './DetailOptionFavorite';

const Option = styled.ul`
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
`;

interface IDetailOption {
  movieData: IMovie;
  movieId: number;
  toggleComment: () => void;
  myRate: number;
  myComment: string;
}
function DetailOption({
  movieData,
  movieId,
  toggleComment,
  myComment,
  myRate,
}: IDetailOption) {
  const navigate = useNavigate();
  const rateMatch = useMatch(`/rate/:listType/:movieId`);
  const isLoggedIn = useSelector((state: RootState) => state.init.isLoggedIn);

  // 별점 매기기 눌렀을 때
  const onChangeStars = (rate: number) => {
    if (!movieData) return;
    if (!isLoggedIn) {
      alert('로그인 후 이용해주세요');
      return;
    }
    const genre_ids = movieData?.genres
      ? movieData?.genres.map((m) => m.id)
      : [];
    const ratedMovieData = {
      id: movieId,
      title: movieData.title,
      poster_path: movieData.poster_path,
      vote_average: movieData.vote_average,
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
  return (
    <Option>
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
      <li>
        <DetailOptionFavorite movieData={movieData} movieId={movieId} />
      </li>
      <li>
        <div className='detailOptionIcon' onClick={toggleComment}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </div>
        <em>코멘트 남기기</em>
      </li>
    </Option>
  );
}

export default DetailOption;
