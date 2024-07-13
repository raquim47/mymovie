export interface IUser {
  email: string | null;
  nickName: string | null;
  uid: string;
  photoURL: string | null;
  likedMovies: string[] | null;
  favoriteMovies: string[] | null;
}