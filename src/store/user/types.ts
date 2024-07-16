export interface IUser {
  email: string;
  nickName: string;
  uid: string;
  photoUrl: string | null;
  likedMovies: string[] | null;
  ratedMovies: string[] | null;
}
