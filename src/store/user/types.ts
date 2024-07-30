import { IMovieSummary, IReviewListMovie } from 'hooks/movies/types';

export interface IUser {
  email: string;
  nickName: string;
  photoUrl: string;
  watchList: { [key: string]: IMovieSummary };
  reviewList: { [key: string]: IReviewListMovie };
}

export interface IUserState {
  userData: IUser | null;
  isInitialized: boolean;
}
