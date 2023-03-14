const API_KEY = '4e86060cea9891d9901e11d72244f1bc';
const BASE_PATH = 'https://api.themoviedb.org/3';

export interface IGenre {
  id: number;
  name: string;
}

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  genres:IGenre[];
  genre_ids : number[];
  tagline?: string;
  vote_average : number;
  original_title:string;
  release_date:string;
  runtime:number;
}

export interface IGetVideoResult {
  results: IMovie[];
}
// * 영화

// 신작
export function getMoviesLatest() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&region=KR&language=ko-KR`
  ).then((response) => response.json());
}
// 개봉 예정
export function getMoviesUpcoming() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&region=KR&language=ko-KR`
  ).then((response) => response.json());
}
// 트랜드
export function getMoviesTrending() {
  return fetch(`${BASE_PATH}/trending/movie/day?api_key=${API_KEY}&region=KR&language=ko-KR`).then(
    (response) => response.json()
  );
}
// 높은 평점
export function getMoviesTopRated() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&region=KR&language=ko-KR`
  ).then((response) => response.json());
}
// 디테일
export function getMovieDetail(id?: number) {
  if (!id) {
    return Promise.resolve(null);
  }
  return fetch(
    `${BASE_PATH}/movie/${id}?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}
