import { useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import ReactStars from 'react-stars';
import { handleUserRatedMovies } from '../../services/fbaseFunc';
import { IMovie } from '../../services/movieApi';
import { RootState } from '../../store';
import { rateMassage } from '../../utils/utils';

interface IDetailOptionRate {
  movieData: IMovie;
  myRate:number;
  myComment:string;
}
function DetailOptionRate({ movieData, myRate, myComment }: IDetailOptionRate) {
  const navigate = useNavigate();
  const rateMatch = useMatch(`/rate/:listType/:movieId`);
  const isLoggedIn = useSelector((state: RootState) => state.init.isLoggedIn);
  // 별점 매기기 눌렀을 때
  const onChangeRate = (currRate: number) => {
    if (!isLoggedIn) {
      alert('로그인 후 이용해주세요');
      return;
    }
    if (myComment && currRate === myRate) {
      const cancleConfirm = window.confirm(
        '별점을 취소하면 저장된 코멘트도 삭제됩니다. 취소하시겠습니까?'
      );
      if (!cancleConfirm) return;
    }
    handleUserRatedMovies(currRate, movieData, currRate === myRate);

    if (currRate === myRate) {
      if (rateMatch) {
        navigate('/rate');
      }
    }
  };
  return (
    <>
      <ReactStars
        onChange={(currRate) => onChangeRate(currRate)}
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
    </>
  );
}
export default DetailOptionRate;
