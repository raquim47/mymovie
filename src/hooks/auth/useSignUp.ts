import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ISignUpCredentials } from 'hooks/auth/types';
import { auth, db } from 'utils/firebase';
import useAuthMutation from './useAuthMutation';

const requestSignUp = async ({ email, password, nickName }: ISignUpCredentials) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, 'users', user.uid), {
    email,
    nickName,
    photoUrl: '',
    watchList: {},
    reviewed: {},
  });
};

const useSignUp = () => useAuthMutation(requestSignUp);

export default useSignUp;
