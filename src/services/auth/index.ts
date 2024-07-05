import { FirebaseError } from 'firebase/app';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { ICredentials } from './types';

export const signUp = async ({ email, password }: ICredentials) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          throw new Error('이미 사용중인 이메일입니다.');
        case 'auth/invalid-email':
          throw new Error('유효하지 않은 이메일 주소입니다.');
        case 'auth/weak-password':
          throw new Error('비밀번호는 6글자 이상이어야 합니다.');
        default:
          throw new Error('회원가입 중 오류가 발생했습니다.');
      }
    }
    throw error;
  }
};

export const login = async ({ email, password }: ICredentials) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          throw new Error('이메일 또는 패스워드가 잘못되었습니다.');
        default:
          throw new Error('로그인 중 오류가 발생했습니다.');
      }
    }
    throw error;
  }
};
