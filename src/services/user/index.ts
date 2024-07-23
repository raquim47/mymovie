import { deleteField, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from 'services/firebase';
import { uuidv4 } from '@firebase/util';
import { IUser } from 'store/user/types';
import { onAuthStateChanged } from 'firebase/auth';
import { IMovie } from 'services/movies/types';
import { ERRORS, handleAsyncError } from 'utils/error';

const getUserRefAndId = async () => {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error(ERRORS.INVALID_USER);
  return { userRef: doc(db, 'users', userId), userId };
};

// 초기 user 인증 및 패치
export const requestUserState = (): Promise<IUser | null> =>
  handleAsyncError(
    async () =>
      new Promise((resolve, reject) => {
        onAuthStateChanged(
          auth,
          async (user) => {
            if (user) {
              const userRef = doc(db, 'users', user.uid);
              const docSnap = await getDoc(userRef);
              resolve(docSnap.data() as IUser);
            } else {
              resolve(null);
            }
          },
          (error) => {
            reject(new Error(ERRORS.AUTH_ERROR));
          }
        );
      })
  );

// 이미지 수정, 삭제
export const updateUserImage = (file: File | null) =>
  handleAsyncError(async () => {
    const { userRef, userId } = await getUserRefAndId();
    const userData = await getDoc(userRef);
    const imageUrl = userData.data()?.photoUrl;

    if (imageUrl) {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    }

    if (file) {
      const storageRef = ref(storage, `user/userPhoto/${userId}/${uuidv4()}`);
      const snapshot = await uploadBytes(storageRef, file);
      const newImageUrl = await getDownloadURL(snapshot.ref);
      await updateDoc(userRef, { photoUrl: newImageUrl });
    } else {
      await updateDoc(userRef, { photoUrl: null });
    }
  });

// 닉네임 수정
export const updateNickName = (nickName: string) =>
  handleAsyncError(async () => {
    if (nickName.length < 2) throw new Error(ERRORS.INVALID_NICKNAME);

    const { userRef } = await getUserRefAndId();
    await updateDoc(userRef, { nickName });
  });

// 찜하기
export const updateWatchList = (movie: IMovie) =>
  handleAsyncError(async () => {
    const { userRef } = await getUserRefAndId();
    const docData = await getDoc(userRef);
    const watchList = docData.exists() ? docData.data()?.watchList || {} : {};

    if (watchList[movie.id]) {
      delete watchList[movie.id];
    } else {
      watchList[movie.id] = {
        ...movie,
        timestamp: Date.now(),
      };
    }
    await updateDoc(userRef, { watchList });
  });

// 평점 매기기
export const updateMovieRating = ({
  rating,
  movie,
  isCancel = false,
}: {
  rating: number;
  movie: IMovie;
  isCancel?: boolean;
}) =>
  handleAsyncError(async () => {
    const { userRef, userId } = await getUserRefAndId();
    const ratingsRef = doc(db, 'ratings', movie.id.toString());
    const userRatingData = isCancel
      ? { [`ratedMovies.${movie.id}`]: deleteField() }
      : {
          [`ratedMovies.${movie.id}`]: {
            ...movie,
            rating,
            timestamp: Date.now(),
          },
        };

    const ratingData = isCancel
      ? { [userId]: deleteField() }
      : { [userId]: { rating, timestamp: Date.now() } };

    await updateDoc(userRef, userRatingData);
    await setDoc(ratingsRef, ratingData, { merge: true });
  });
