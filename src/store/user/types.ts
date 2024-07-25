import { IMovie } from 'services/movies/types';

export interface IUser {
  email: string;
  nickName: string;
  uid: string;
  photoUrl: string | null;
  watchList: { [key: string]: IMovie } | null;
  ratedMovies: { [key: string]: IMovie } | null;
}

export interface IUserState {
  userData: IUser | null | undefined;
}
