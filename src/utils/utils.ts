import { IFavoriteMovie, IRatedMovie } from "../store";

// 이미지 가져오기
export const makeImagePath = (id: string, format?: string) => {
  return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${id}`;
};
// 평점 메세지
interface IRateMassage {
  [key: number]: string;
}
export const rateMassage:IRateMassage = {
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
interface ISortMoviesData {
  [key:number] : IFavoriteMovie | IRatedMovie;
}

export type ISortType = 'newest' | 'oldest' | 'lowRate' | 'highRate';

export const sortMovies = (movie: ISortMoviesData, sortType: ISortType) => {
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
    case 'lowRate':
      return movieArr.sort((a, b) => a.vote_average - b.vote_average);
    case 'highRate':
      return movieArr.sort((a, b) => b.vote_average - a.vote_average);
    default:
      return movieArr;
  }
};