import { IMovieSummary, IReviewListMovie } from 'services/movies/types';

export interface IUser {
  email: string;
  nickName: string;
  uid: string;
  photoUrl?: string;
  watchList?: { [key: string]: IMovieSummary };
  reviewList?: { [key: string]: IReviewListMovie };
}

export interface IUserState {
  userData: IUser | null;
  isInitialized: boolean;
}
