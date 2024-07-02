import { IMovie } from '@/services/movieApi';

// 이미지 가져오기
export const getMovieImagePath = (
  movieData: IMovie,
  mode: 'backdrop' | 'poster',
  format: 'w500' | 'w1280' = 'w500'
) => {
  const imageKey = `${mode}_path`;
  const imageId = movieData[imageKey as keyof IMovie];

  return imageId
    ? `https://image.tmdb.org/t/p/${format}/${imageId}`
    : require('../assets/no-image-icon-6.png');
};

// 장르
interface IGenres {
  [key: string]: string;
}

export const genres: IGenres = {
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
