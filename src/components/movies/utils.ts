import { IMovieDetails } from 'services/movies/types';

// 이미지 가져오기
export const getMovieImagePath = (
  movieData: IMovieDetails,
  mode: 'backdrop' | 'poster',
  format: 'w500' | 'w1280' = 'w500'
): string => {
  const imageKey = `${mode}_path`;
  const imageId = movieData[imageKey as keyof IMovieDetails];

  return imageId
    ? `https://image.tmdb.org/t/p/${format}/${imageId}`
    : require('../../assets/no-image-icon-6.png');
};
