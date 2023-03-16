import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IMovie } from '../api';
import { makeImagePath } from '../utils';

interface IGenres {
  [key: string]: string;
}

const genres: IGenres = {
  28: '액션',
  12: '모험',
  16: '애니메이션',
  35: '코미디',
  80: '범죄',
  99: '다큐',
  18: '드라마',
  10751: '가족',
  14: '판타지',
  36: '역사',
  27: '공포',
  10402: '음악',
  9648: '미스터리',
  10749: '로맨스',
  878: 'SF',
  10770: 'TV',
  53: '스릴러',
  10752: '전쟁',
  37: '서부',
};

const Wrapper = styled(motion.div)<{ $bgPhoto: string }>`
  position: relative;
  border-radius: 4px;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-of-type {
    transform-origin: center left;
  }
  &:last-of-type {
    transform-origin: center right;
  }
`;

const BannerInfo = styled.div``;

const ListInfo = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  color: ${(props) => props.theme.white.white};

  h4 {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 4px;
  }
  small {
    font-size: 10px;
    font-weight: 400;
  }
  article {
    display: flex;
    gap: 5px;
    span {
      margin-top: 2px;
      font-size: 10px;
    }
  }
`;

const InitialDetailBox = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const WrapperVariants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    transition: {
      type: 'tween',
      duration: 0.2,
      delay: 0.3,
    },
  },
};

const infoVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.2,
      delay: 0.2,
    },
  },
};

interface IListItem {
  movieData: IMovie;
  listType?: string;
  hoverAnimation?: boolean;
  forBanner?: boolean;
}

function ListItem({
  movieData,
  listType,
  hoverAnimation = false,
  forBanner = false,
}: IListItem) {
  const navigate = useNavigate();
  const onBoxClicked = () => {
    navigate(`/home/${listType}/${movieData.id}`);
  };

  return (
    <Wrapper
      variants={WrapperVariants}
      whileHover={hoverAnimation ? 'hover' : ''}
      initial="initial"
      transition={{ type: 'tween' }}
      onClick={onBoxClicked}
      $bgPhoto={
        movieData.backdrop_path
          ? makeImagePath(movieData.backdrop_path, 'w500')
          : require('../assets/no-image-icon-6.png')
      }
    >
      {forBanner ? (
        <BannerInfo></BannerInfo>
      ) : (
        <ListInfo
          variants={infoVariants}
          whileHover={hoverAnimation ? 'hover' : ''}
        >
          <h4>{movieData.title}</h4>
          <small>평점 : {movieData.vote_average?.toFixed(1)}</small>
          <article>
            {movieData.genre_ids?.map((id) => (
              <span key={id}>{genres[String(id)]}</span>
            ))}
          </article>
          <InitialDetailBox
            layoutId={(listType ? listType : '') + movieData.id}
          />
        </ListInfo>
      )}
    </Wrapper>
  );
}

export default ListItem;
