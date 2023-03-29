import styled from 'styled-components';
import { faHeart as faHeartFill } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMatch, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useEffect, useState } from 'react';
import { IMovie } from '../../services/movieApi';
import { handleUserFavoriteMovie } from '../../services/fbaseFunc';

const Wrapper = styled.div<{ isFavorite: boolean }>`
  color: ${(props) => (props.isFavorite ? props.theme.purple : 'inherit')};
`;

interface IDetailOptionFavorite {
  movieData: IMovie;
}

function DetailOptionFavorite({ movieData }: IDetailOptionFavorite) {
  const navigate = useNavigate();
  const favoriteMatch = useMatch(`/favorite/:listType/:movieId`);
  const isLoggedIn = useSelector((state: RootState) => state.init.isLoggedIn);
  const favoriteMovies = useSelector(
    (state: RootState) => state.userData?.favoriteMovies
  );
  const [isFavorite, setIsfavorite] = useState(false);
  // '보고 싶어요' 눌렀을 때
  const onClickFavorite = () => {
    if (!isLoggedIn) {
      alert('로그인 후 이용해주세요');
      return;
    }
    // '/favorite'에서 보고싶어요를 취소할 경우 삭제와 동시에 navigate
    if (isFavorite && favoriteMatch) {
      navigate('/favorite');
    }
    handleUserFavoriteMovie(movieData);
  };

  // store의 favoriteMovies를 확인해서 isFavorite에 반영
  useEffect(() => {
    if (!isLoggedIn || !favoriteMovies) return;
    setIsfavorite(!!favoriteMovies[movieData.id]);
  }, [movieData, favoriteMovies]);

  return (
    <Wrapper isFavorite={isFavorite}>
      <div className='detailOptionIcon' onClick={onClickFavorite}>
        {!isFavorite ? (
          <FontAwesomeIcon icon={faHeart} />
        ) : (
          <FontAwesomeIcon icon={faHeartFill} />
        )}
      </div>
      <em>보고싶어요</em>
    </Wrapper>
  );
}

export default DetailOptionFavorite;
