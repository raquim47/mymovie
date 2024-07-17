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
