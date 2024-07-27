import { IMovie } from 'services/movies/types';

export interface IUser {
  email: string;
  nickName: string;
  uid: string;
  photoUrl?: string;
  watchList?: { [key: string]: IMovie };
  ratedMovies?: { [key: string]: IMovie };
}

export interface IUserState {
  userData: IUser | null;
  isInitialized: boolean;
}
