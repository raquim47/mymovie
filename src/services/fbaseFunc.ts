import {
  browserSessionPersistence,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  clearUserData,
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
import { arrayRemove, deleteField, serverTimestamp, Timestamp } from 'firebase/firestore';
import { IMovie } from './movieApi';
import { IRating, IUserInfo } from '../components/detail/Detail';

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
  // serData 세팅
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
// 등록된 별점 확인
export const checkMyRate = (
  movieId: number,
  ratedMovie: IMovie[]
): { myRate: number; myComment: string } => {
  const movie = ratedMovie.find((m: IMovie) => m.id === movieId);
  console.log(movie?.myComment);
  return { myRate: movie?.myRate || 0, myComment: movie?.myComment || '' };
};

// 별점 매기기 firestore에 등록/삭제
export const handleRatedList = async (
  movie: IMovie,
  isCancle: boolean = false
) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const userRef = doc(db, 'users', currentUser.uid);
    const docData = await getDoc(userRef);
    // 문서가 있는지 ? ratedMovie가있는지?(없으면 []반환) : 문서가 없으면 []
    let ratedMovie = docData.exists() ? docData.data()?.ratedMovie || [] : [];
    const index = ratedMovie.findIndex((m: IMovie) => m.id === movie.id);
    if (isCancle) {
      // ratedMovie에서 현재 movie를 제거
      ratedMovie.splice(index, 1);
    } else if (index !== -1) {
      // 이미 있을 때 myRate만 업데이트
      ratedMovie[index].myRate = movie.myRate;
    } else {
      ratedMovie = [movie, ...ratedMovie];
    }
    // ratedMovie 컬렉션을 업데이트
    await updateDoc(userRef, { ratedMovie });
  }
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
export const saveOnComment = async (movieId: number, comment: string) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const docRef = doc(db, 'ratings', movieId.toString());
    await setDoc(
      docRef,
      { [currentUser.uid]: { comment: comment, timestamp: serverTimestamp() } },
      { merge: true }
    );
  }
};
// 공용 별점 정보 저장
export const saveOnRatings = async (
  movieId: number,
  rating: number,
  isCancle: boolean
) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const ratingRef = doc(db, 'ratings', movieId.toString());
    if (isCancle) {
      // 필드를 삭제하기 위해 deleteField 사용
      const updateData = { [currentUser.uid]: deleteField() };
      await updateDoc(ratingRef, updateData);
    } else {
      await setDoc(
        ratingRef,
        {
          [currentUser.uid]: { rating: rating, timestamp: serverTimestamp() },
        },
        { merge: true }
      );
      // { merge: true }를 사용하면, 주어진 문서가 이미 존재하면 데이터를 병합하고, 없으면 새로운 문서를 생성
    }
  }
};
// Detail 마운트시 firestore의 ratings 가져오기
export const getRatings = (
  movieId: number,
  callback: (ratings: any) => void
) => {
  const ratingRef = doc(db, 'ratings', movieId.toString());
  const unsubscribe = onSnapshot(ratingRef, (docSnapshot) => {
    const data = docSnapshot.data();
    if (data) {
      const ratings = Object.entries(data).map(([uid, ratingData]) => ({
        uid,
        rating: ratingData.rating,
        timestamp: ratingData.timestamp,
        comment: ratingData.comment,
      })) as IRating[];
      callback(ratings);
    } else {
      callback({});
    }
  });

  return unsubscribe;
};

export const getUsersInfo = async (
  uid: string,
  rating: number,
  comment: string
) => {
  const userRef = doc(db, 'users', uid);
  const docData = await getDoc(userRef);
  if (docData.exists()) {
    const { nickName, userPhoto } = docData.data() as IUserInfo;
    return { nickName, userPhoto, rating, comment };
  }
};
// 코멘트만 삭제
export const deleteComment = async (movieId: number) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const ratingsRef = doc(db, 'ratings', movieId.toString());
    const ratingsDoc = await getDoc(ratingsRef);
    const usersRef = doc(db, 'users', currentUser.uid);
    const usersDoc = await getDoc(usersRef);
    const ratedMovie = usersDoc.exists()
      ? usersDoc.data()?.ratedMovie || []
      : [];
    const index = ratedMovie.findIndex((m: IMovie) => m.id === movieId);
    if (index !== -1) {
      delete ratedMovie[index].myComment;
      await updateDoc(usersRef, { ratedMovie });
    }
    if (ratingsDoc.exists()) {
      const ratingsData = ratingsDoc.data();
      if (ratingsData[currentUser.uid]) {
        delete ratingsData[currentUser.uid].comment;
        await updateDoc(ratingsRef, ratingsData);
      }
    }
  }
};
// 코멘트 등록
export const handleCommentya = async (movie: IMovie) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const userRef = doc(db, 'users', currentUser.uid);
    const docData = await getDoc(userRef);
    // 문서가 있는지 ? ratedMovie가있는지?(없으면 []반환) : 문서가 없으면 []
    let ratedMovie = docData.exists() ? docData.data()?.ratedMovie || [] : [];
    const index = ratedMovie.findIndex((m: IMovie) => m.id === movie.id);
    if (index !== -1) {
      // 이미 있을 때 myRate만 업데이트
      ratedMovie[index].myComment = movie.myComment;
    } else {
      ratedMovie = [movie, ...ratedMovie];
    }
    // ratedMovie 컬렉션을 업데이트
    await updateDoc(userRef, { ratedMovie });
  }
};
