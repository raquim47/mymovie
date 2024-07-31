import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { ILoginCredentials } from 'hooks/auth/types';
import { auth, db } from 'utils/firebase';
import useAuthMutation from './useAuthMutation';

// 로그인
const requestLogin = async ({ email, password }: ILoginCredentials) => {
  await signInWithEmailAndPassword(auth, email, password);
};

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

const useLogin = () => {
  const { mutate: login, isPending: isLoginPending } = useAuthMutation(requestLogin);
  const { mutate: googleLogin, isPending: isGoogleLoginPending } =
    useAuthMutation(requestGoogleLogin);

  const isPending = isLoginPending || isGoogleLoginPending;

  return { login, googleLogin, isPending };
};

export default useLogin;
