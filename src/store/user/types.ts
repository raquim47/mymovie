export interface IUser {
  email: string | null;
  nickName: string | null;
  uid: string;
  photoUrl: string | null;
  likedMovies: string[] | null;
  ratedMovies: string[] | null;
}