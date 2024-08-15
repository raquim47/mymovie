import { doc, getDoc } from "firebase/firestore";
import { db } from "services/firebase";
import { handleRequestTMDB } from "utils/request-handler";
import { IMovie, IReviews } from "./types";

const getMovieReviews = async (movieId: number) => {
  const reviewsRef = doc(db, 'reviews', String(movieId));
  const reviewsDoc = await getDoc(reviewsRef);
  return reviewsDoc.exists() ? (reviewsDoc.data() as IReviews) : undefined;
};

export const fetchMovieDetail = async (movieId: number) => {
  const movie = await handleRequestTMDB<IMovie>(`movie/${movieId}`);
  movie.reviews = await getMovieReviews(movieId);
  return movie;
};