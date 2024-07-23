import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { ILoginCredentials, ISignUpCredentials } from './types';
import { handleAsyncError } from 'utils/error';

// 로그인
export const requestLogin = ({ email, password }: ILoginCredentials) =>
  handleAsyncError(async () => {
    await signInWithEmailAndPassword(auth, email, password);
  });

// 구글 가입, 로그인
export const requestGoogleLogin = () =>
  handleAsyncError(async () => {
    const provider = new GoogleAuthProvider();
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
  });

// 회원가입
export const requestSignUp = ({ email, password, nickName }: ISignUpCredentials) =>
  handleAsyncError(async () => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
      email,
      nickName,
    });
  });

// 로그아웃
export const requestLogout = () =>
  handleAsyncError(async () => {
    await signOut(auth);
  });
