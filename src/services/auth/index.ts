import { FirebaseError } from 'firebase/app';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth';
import { IAuthErrors, ILoginCredentials, ISignUpCredentials } from './types';

const AUTH_REQUEST_ERRORS: IAuthErrors = {
  'auth/user-not-found': {
    message: '이메일 또는 패스워드가 잘못되었습니다.',
    name: 'global',
  },
  'auth/wrong-password': {
    message: '이메일 또는 패스워드가 잘못되었습니다.',
    name: 'global',
  },
  'auth/invalid-password': {
    message: '비밀번호를 6글자 이상 입력해주세요.',
    name: 'email',
  },
  'auth/invalid-email': { message: '유효하지 않은 이메일 주소입니다.', name: 'email' },
  'auth/email-already-in-use': { message: '이미 사용중인 이메일입니다.', name: 'email' },
  'auth/invalid-display-name': {
    message: '유효하지 않은 닉네임입니다.',
    name: 'displayName',
  },
  default: {
    message: '서버 오류가 발생했습니다. 다시 시도해주세요.',
    name: 'global',
  },
};

export const login = async ({ email, password }: ILoginCredentials) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof FirebaseError) {
      const standardError =
        AUTH_REQUEST_ERRORS[error.code] || AUTH_REQUEST_ERRORS['default'];
      throw new Error(JSON.stringify(standardError));
    }
    throw error;
  }
};

export const signUp = async ({ email, password, displayName }: ISignUpCredentials) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName });
  } catch (error) {
    if (error instanceof FirebaseError) {
      const standardError =
        AUTH_REQUEST_ERRORS[error.code] || AUTH_REQUEST_ERRORS['default'];
      throw new Error(JSON.stringify(standardError));
    }
    throw error;
  }
};

export const initAuth = () => {
  return new Promise<User | null>((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          resolve(user);
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
