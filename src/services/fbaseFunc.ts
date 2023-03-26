import {
  browserSessionPersistence,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import firebase from 'firebase/app';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearUserData,
  IUserData,
  RootState,
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
  currentUser,
} from './fbaseInit';
import { arrayRemove } from 'firebase/firestore';
import { IMovie } from './movieApi';

// firebase 초기화, 사용자 인증, userData 세팅
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
        // 오류 처리
      });
  }, []);
  // serData 세팅
  useEffect(() => {
    if (isLoggedIn) {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const unsubscribe = onSnapshot(userRef, (doc) => {
          const userData = doc.data() as IUserData;
          dispatch(setUserData(userData));
        });
        // Clean up subscription
        return () => {
          unsubscribe();
        };
      }
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
// '보고 싶어요' 상태 확인
export const checkIsFavorite = (
  movieId: number,
  favoriteMovie: IMovie[]
): boolean => {
  return favoriteMovie.some((movie: IMovie) => movie.id === movieId);
};
// '보고 싶어요' 영화 데이터 firestore에 등록/삭제
export const handleFavoriteList = async (movie: IMovie) => {
  if (currentUser) {
    const userRef = doc(db, 'users', currentUser.uid);
    const docData = await getDoc(userRef);
    // 문서가 있는지 ? favoriteMovie가있는지?(없으면 []반환) : 문서가 없으면 []
    const favoriteMovie = docData.exists()
      ? docData.data()?.favoriteMovie || []
      : [];
    if (favoriteMovie.some((m: IMovie) => m.id === movie.id)) {
      await updateDoc(userRef, {
        favoriteMovie: arrayRemove(movie),
      });
    } else {
      await updateDoc(userRef, { favoriteMovie: [movie, ...favoriteMovie] });
    }
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
