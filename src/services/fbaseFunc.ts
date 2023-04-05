import {
  browserSessionPersistence,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  clearUserData,
  IRatingUsers,
  IUserAccount,
  setInitFirebase,
  setIsLoggedIn,
  setUserData,
} from '../store';
import {
  auth,
  db,
  getDocs,
  query,
  collection,
  where,
  doc,
  onSnapshot,
  getDoc,
  updateDoc,
  setDoc,
} from './fbaseInit';
import { deleteField } from 'firebase/firestore';
import { IMovie } from './movieApi';

// firebase 초기화, 사용자 인증, userData 세팅
export const useInitialize = (isLoggedIn: boolean) => {
  const dispatch = useDispatch();
  //firebase 초기화, 사용자 인증,
  useEffect(() => {
    auth
      .setPersistence(browserSessionPersistence)
      .then(() => {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            dispatch(setIsLoggedIn(true));
          } else {
            dispatch(setIsLoggedIn(false));
          }
          dispatch(setInitFirebase());
        });
      })
      .catch((error) => {
        console.log(error);
        // 오류 처리
      });
  }, []);
  // firestore의 user컬렉션을 구독, 리덕스 스토어에 실시간 업데이트
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const unsubscribe = onSnapshot(userRef, (doc) => {
        const userData = doc.data() as IUserAccount;
        dispatch(setUserData(userData));
      });
      // Clean up subscription
      return () => {
        unsubscribe();
      };
    } else {
      dispatch(clearUserData());
    }
  }, [isLoggedIn]);
};
// 이메일 중복 체크
export const checkEmailExists = async (email: string) => {
  const methods = await fetchSignInMethodsForEmail(auth, email);
  return methods.length > 0 ? '이미 가입된 이메일입니다' : undefined;
};
// 닉네임 중복 체크
export const checkNickNameExists = async (
  nickName: string,
  currentValue?: string
) => {
  if (currentValue === nickName) return;

  const querySnapshot = await getDocs(
    query(collection(db, 'users'), where('nickName', '==', nickName))
  );
  return querySnapshot.empty ? undefined : '이미 사용 중인 닉네임입니다';
};
// 닉네임으로 유저 찾기
export const searchNickName = async (keyword: string) => {
  const querySnapShot = await getDocs(
    query(
      collection(db, 'users'),
      where('nickName', '>=', keyword),
      where('nickName', '<=', keyword + '\uf8ff')
    )
  );
  return querySnapShot;
};
// '보고 싶어요' 영화 데이터 firestore에 등록/삭제
export const handleUserFavoriteMovie = async (movie: IMovie) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const userRef = doc(db, 'users', currentUser.uid);
    const docData = await getDoc(userRef);
    // 문서가 있는지 ? favoriteMovies가있는지?(없으면 {}반환) : 문서가 없으면 {}
    const favoriteMovies = docData.exists()
      ? docData.data()?.favoriteMovies || {}
      : {};
    // favorite이면 삭제
    if (favoriteMovies[movie.id]) {
      await updateDoc(userRef, {
        [`favoriteMovies.${movie.id}`]: deleteField(),
      });
    } else {
      // favorite이 아니면 새로운 객체 저장
      await updateDoc(userRef, {
        [`favoriteMovies.${movie.id}`]: {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
          genre_ids: movie?.genres ? movie?.genres.map((m) => m.id) : [],
          timestamp: Date.now(),
        },
      });
    }
  }
};
// '별점' firestore(users/ratings) 등록/삭제
export const handleUserRatedMovies = async (
  currRate: number,
  movie: IMovie,
  isCancle: boolean = false
) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const usersRef = doc(db, 'users', currentUser.uid);
    const ratingsRef = doc(db, 'ratings', movie.id.toString());
    if (isCancle) {
      await updateDoc(ratingsRef, { [currentUser.uid]: deleteField() });
      await updateDoc(usersRef, {
        [`ratedMovies.${movie.id}`]: deleteField(),
      });
    } else {
      await setDoc(
        ratingsRef,
        {
          [currentUser.uid]: { rating: currRate, timestamp: Date.now() },
        },
        { merge: true }
      );
      await setDoc(
        usersRef,
        {
          ratedMovies: {
            [movie.id]: {
              id: movie.id,
              title: movie.title,
              poster_path: movie.poster_path,
              vote_average: movie.vote_average,
              genre_ids: movie?.genres ? movie?.genres.map((m) => m.id) : [],
              timestamp: Date.now(),
              rate: currRate,
            },
          },
        },
        { merge: true }
      );
      // { merge: true }를 사용하면, 주어진 문서가 이미 존재하면 데이터를 병합하고, 없으면 새로운 문서를 생성
    }
  }
};
// '코멘트' firestore(users/ratings) 등록
export const addComment = async (movieId: number, comment: string) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const usersRef = doc(db, 'users', currentUser.uid);
    const ratingsRef = doc(db, 'ratings', movieId.toString());
    await setDoc(
      ratingsRef,
      { [currentUser.uid]: { comment: comment, timestamp: Date.now() } },
      { merge: true }
    );
    await setDoc(
      usersRef,
      {
        ratedMovies: {
          [movieId]: {
            timestamp: Date.now(),
            comment,
          },
        },
      },
      { merge: true }
    );
  }
};
// 코멘트만 firestore(users/ratings) 삭제
export const deleteComment = async (movieId: number) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    // ratingsRef에서 해당 사용자의 코멘트 삭제
    const ratingsRef = doc(db, 'ratings', movieId.toString());
    const ratingsDoc = await getDoc(ratingsRef);
    const ratingsData = ratingsDoc.data();
    if (ratingsData) {
      delete ratingsData[currentUser.uid].comment;
      await updateDoc(ratingsRef, ratingsData);
    }
    // usersRef에서 해당 영화에 대한 코멘트 삭제
    const usersRef = doc(db, 'users', currentUser.uid);
    const usersDoc = await getDoc(usersRef);
    const usersData = usersDoc.data();
    if (usersData) {
      delete usersData.ratedMovies[movieId].comment;
      await updateDoc(usersRef, { ratedMovies: usersData.ratedMovies });
    }
  }
};
// firestore ratings의 유저 정보 가져오기
export const getRatingUsers = async (movieId: number) => {
  const ratingsResult = [];
  const ratingsRef = doc(db, 'ratings', movieId.toString());
  const ratingsDoc = await getDoc(ratingsRef);
  if (ratingsDoc.exists()) {
    const movieRatings = ratingsDoc.data();
    for (const userId in movieRatings) {
      const usersRef = doc(db, 'users', userId);
      const usersDoc = await getDoc(usersRef);

      if (usersDoc.exists()) {
        const userData = usersDoc.data();
        const ratingData = movieRatings[userId];
        const ratingObj: IRatingUsers = {
          userId: userId,
          nickName: userData.nickName,
          userPhoto: userData.userPhoto,
          rate: ratingData.rating,
          timestamp: ratingData.timestamp,
        };

        if (ratingData.comment) {
          ratingObj.comment = ratingData.comment;
        }

        ratingsResult.push(ratingObj);
      }
    }
  }

  ratingsResult.sort((a, b) => b.timestamp - a.timestamp);
  return ratingsResult;
};
