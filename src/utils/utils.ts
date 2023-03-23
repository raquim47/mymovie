import { browserSessionPersistence, getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearUser, IUser, setUser, setInit } from '../store';

// firebase 초기화, 사용자 인증
export const useAuthState = () => {
  const dispatch = useDispatch();
  const db = getFirestore();
  const authService = getAuth();

  useEffect(() => {
    authService.setPersistence(browserSessionPersistence)
      .then(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data() as IUser;
        dispatch(setUser(userData));
      } else {
        dispatch(clearUser());
      }
      console.log(user)
      dispatch(setInit());
    });
  }).catch((error) => {
    // 오류 처리
  });
  }, [authService, db, dispatch]);
}

// 이미지 가져오기
export const makeImagePath = (id: string, format?: string) => {
  return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${id}`;
};
