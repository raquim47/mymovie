import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { ILoginCredentials, ISignUpCredentials } from './types';
import { handleAuthError } from './errors';
import { IUser } from 'store/user/types';

// 로그인
export const requestLogin = async ({ email, password }: ILoginCredentials) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    handleAuthError(error);
  }
};

// 구글 가입, 로그인
export const requestGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        nickName: Math.random().toString(36).slice(2, 9),
        createdAt: new Date(),
      });
    }
  } catch (error) {
    handleAuthError(error);
  }
};

// 회원가입
export const requestSignUp = async ({
  email,
  password,
  nickName,
}: ISignUpCredentials) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
      email,
      nickName,
      createdAt: new Date(),
    });
  } catch (error) {
    handleAuthError(error);
  }
};

// 로그아웃
export const requestLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    handleAuthError(error);
  }
};

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
        reject(new Error('인증 상태 확인 중 오류가 발생했습니다. :' + error.message));
      }
    );
  });
};
