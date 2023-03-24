import { browserSessionPersistence, getAuth } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
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

// firebase 초기화, 사용자 인증, userData 세팅
export const useInitialize = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.init);
  const dispatch = useDispatch();
  const auth = getAuth();
  const db = getFirestore();
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
  }, [auth, dispatch]);
  // 초기 userData 세팅
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
  }, [isLoggedIn, auth, db, dispatch,]);
};

// 닉네임 중복 체크
export const checkNickNameExists = async (
  nickName: string,
  currentValue?: string
) => {
  if (currentValue === nickName) return;

  const db = getFirestore();
  const querySnapshot = await getDocs(
    query(collection(db, 'users'), where('nickName', '==', nickName))
  );
  return querySnapshot.empty ? undefined : '이미 사용 중인 닉네임입니다';
};

// 이미지 가져오기
export const makeImagePath = (id: string, format?: string) => {
  return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${id}`;
};
