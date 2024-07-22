import { deleteField, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from 'services/firebase';
import { uuidv4 } from '@firebase/util';
import { IUser } from 'store/user/types';
import { onAuthStateChanged } from 'firebase/auth';
import { createError } from 'utils/error';
import { IMovie } from 'services/movies/types';

// 초기 user 인증 및 패치
export const requestUserState = async (): Promise<IUser | null> => {
  return new Promise(async (resolve, reject) => {
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
        reject(
          createError('인증 상태 확인 중 오류가 발생했습니다. :' + error.message, 500)
        );
      }
    );
  });
};

const getUserRefAndId = async () => {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error('No User ID found.');
  return { userRef: doc(db, 'users', userId), userId };
};

// 이미지 수정, 삭제
export const updateUserImage = async (file: File | null) => {
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
};

// 닉네임 수정
export const updateNickName = async (nickName: string) => {
  const user = auth.currentUser;
  if (user) {
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, { nickName });
  }
};

// 찜하기
export const updateWatchList = async (movie: IMovie) => {
  const currentUser = auth.currentUser;
  if (!currentUser) return;

  const userRef = doc(db, 'users', currentUser.uid);
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
};

export const updateMovieRating = async ({
  rating,
  movie,
  isCancel = false,
}: {
  rating: number;
  movie: IMovie;
  isCancel?: boolean;
}) => {
  const currentUser = auth.currentUser;
  if (!currentUser) return;
  
  const userId = currentUser.uid;
  const usersRef = doc(db, 'users', userId);
  const ratingsRef = doc(db, 'ratings', movie.id.toString());
  const ratingsDoc = await getDoc(ratingsRef);

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

  // users 컬렉션
  await updateDoc(usersRef, userRatingData);
  // ratings 컬렉션
  if (ratingsDoc.exists()) {
    await updateDoc(ratingsRef, ratingData);
  } else {
    await setDoc(ratingsRef, ratingData);
  }
};
