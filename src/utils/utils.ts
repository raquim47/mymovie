import { IFavoriteMovie, IRatedMovie } from '../store';

// 이미지 가져오기
export const makeImagePath = (id: string, format?: string) => {
  return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${id}`;
};
// 평점 메세지
interface IRateMassage {
  [key: number]: string;
}
export const rateMassage: IRateMassage = {
  0: '평가하기',
  0.5: '최악이에요',
  1: '싫어요',
  1.5: '재미없어요',
  2: '별로예요',
  2.5: '부족해요',
  3: '괜찮아요',
  3.5: '좋아요',
  4: '재미있어요',
  4.5: '훌륭해요!',
  5: '최고예요!',
};
// 년도 가져오기
export const getYear = (date?: string) => {
  if (date) return date.split('-')[0];
  return '';
};

// 영화 리스트 정렬
export type ISortMovies = IFavoriteMovie | IRatedMovie;

interface ISortMoviesData {
  [key: number]: ISortMovies;
}

export type ISortType = 'newest' | 'oldest' | 'lowAveRate' | 'highAveRate';

export const sortName = {
  newest: '담은 순',
  oldest: '담은 역순',
  lowAveRate: '평균 별점 낮은 순',
  highAveRate: '평균 별점 높은 순',
};

export const sortMovies = (
  movie: ISortMoviesData,
  sortType: ISortType
): ISortMovies[] => {
  const movieArr = Object.values(movie);
  switch (sortType) {
    case 'newest':
      return movieArr.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    case 'oldest':
      return movieArr.sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
    case 'lowAveRate':
      return movieArr.sort((a, b) => a.vote_average - b.vote_average);
    case 'highAveRate':
      return movieArr.sort((a, b) => b.vote_average - a.vote_average);
    default:
      return movieArr;
  }
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
