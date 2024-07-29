import { FIREBASE_CONFIG } from 'config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { IUser } from 'store/user/types';
import { ERRORS } from 'utils/error';

const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const getUserDoc = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  if (!userDoc.exists()) {
    throw new Error(ERRORS.INVALID_USER);
  }
  return { userRef, userData: userDoc.data() as IUser };
};

const getCurrentUser = async () => {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error(ERRORS.INVALID_USER);

  const { userRef, userData } = await getUserDoc(userId);

  return { userRef, userData, userId };
};

export { auth, db, storage, getUserDoc, getCurrentUser };
