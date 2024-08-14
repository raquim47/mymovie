import { IMovieSummary } from "services/movies/types";

export interface IUser {
  email: string;
  nickName: string;
  photoUrl: string;
  watchList: { [key: string]: IMovieSummary };
  reviewed: { [key: string]: IMovieSummary };
}

export interface IUserState {
  userData: IUser | null;
  isInitialized: boolean;
}