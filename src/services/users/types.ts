import { IMovieSummary, IReviewedMovie } from "hooks/movies/types";

export interface IUser {
  email: string;
  nickName: string;
  photoUrl: string;
  watchList: { [key: string]: IMovieSummary };
  reviewed: { [key: string]: IReviewedMovie };
}

export interface IUserState {
  userData: IUser | null;
  isInitialized: boolean;
}