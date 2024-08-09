import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { ILoginCredentials, ISignUpCredentials } from 'hooks/auth/types';
import { FIREBASE_AUTH_ERRORS } from 'utils/errors';
import { auth, db } from 'utils/firebase';

const handleRequest = async <T>(request: () => Promise<T>) => {
  try {
    await request();
  } catch (error) {
    if (error instanceof FirebaseError) {
      const { message, name } = FIREBASE_AUTH_ERRORS[error.code] || {
        message: `요청에 실패했습니다. 다시 시도해 주세요. : ${error.message}`,
        name: 'common',
      };
      const customError = new Error(message);
      customError.name = name;
      throw customError;
    } else {
      const unknownError = new Error('알 수 없는 오류가 발생했습니다.');
      unknownError.name = 'common';
      throw unknownError;
    }
  }
};

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

// 구글 가입, 로그인
const requestGoogleLogin = async () => {
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
};

