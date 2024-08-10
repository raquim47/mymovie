import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { CustomError } from 'utils/errors';
import { auth, db } from 'utils/firebase';
import handleRequest from 'utils/request-handler';
import { ILoginCredentials, ISignUpCredentials } from './types';

// 회원가입
export const requestSignUp = async ({ email, password, nickName }: ISignUpCredentials) =>
  handleRequest(async () => {
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
      email,
      nickName,
      photoUrl: '',
      watchList: {},
      reviewed: {},
    });
  });

// 로그인
export const requestLogin = ({ email, password }: ILoginCredentials) =>
  handleRequest(() => signInWithEmailAndPassword(auth, email, password));

// 구글 로그인
export const requestGoogleLogin = () =>
  handleRequest(async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        nickName: Math.random().toString(36).slice(2, 9),
        photoUrl: '',
        watchList: {},
        reviewed: {},
      });
    }
  });
