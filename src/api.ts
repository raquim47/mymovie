const API_KEY = '4e86060cea9891d9901e11d72244f1bc';
const LANGUAGE = "ko-KR";
const REGION = "KR";
const BASE_PATH = 'https://api.themoviedb.org/3';
const TAIL_PATH = `api_key=${API_KEY}&language=${LANGUAGE}&region=${REGION}`;
// https://api.themoviedb.org/3/search/movie?api_key=4e86060cea9891d9901e11d72244f1bc&language=ko-KR&region=KR&query=%EB%82%A8%EC%9E%90&page=2

// http요청 실패 고려???

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

export interface IGetMovieResult {
  results: IMovie[];
  page:number;
  total_pages:number;
}
// * 영화

// 신작
export function getMoviesLatest() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?${TAIL_PATH}`
  ).then((response) => response.json());
}
// 개봉 예정
export function getMoviesUpcoming() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?${TAIL_PATH}`
  ).then((response) => response.json());
}
// 트랜드
export function getMoviesTrending() {
  return fetch(`${BASE_PATH}/trending/movie/day?${TAIL_PATH}`).then(
    (response) => response.json()
  );
}
// 높은 평점
export function getMoviesTopRated() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?${TAIL_PATH}`
  ).then((response) => response.json());
}
// 디테일
export function getMovieDetail(id?: number) {
  if (!id) {
    return Promise.reject(new Error('id 값이 주어지지 않았습니다.'));
  }
  return fetch(
    `${BASE_PATH}/movie/${id}?${TAIL_PATH}`
  ).then((response) => response.json());
}

// 검색
export function GetSearched(keyword: string, pageParam: number) {
  return fetch(`${BASE_PATH}/search/movie?${TAIL_PATH}&query=${keyword}&page=${pageParam}`)
    .then((response) => response.json())
    .catch((err) => err);
}
// export function GetSearched(keyword: string, page: number) {
//   return fetch(`${BASE_PATH}/search/movie?${TAIL_PATH}&query=${keyword}&page=${page}`)
//     .then((response) => response.json())
//     .catch((err) => err);
// }
// export function GetSearched(keyword: string) {
//   return fetch(`${BASE_PATH}/search/movie?${TAIL_PATH}&query=${keyword}&page=1`)
//     .then((response) => response.json())
//     .catch((err) => err);
// }