import { ERRORS } from 'utils/errors';
import { auth, db } from 'services/firebase';
import { handleRequest } from 'utils/request-handler';
import { doc, getDoc } from 'firebase/firestore';
import { IUser } from './types';

export const getLoggedInUser = async () => {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error(ERRORS.INVALID_USER);

  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  if (!userDoc.exists()) {
    throw new Error(ERRORS.INVALID_USER);
  }

  return { userRef, userData: userDoc.data() as IUser, userId };
};

export const fetchCurrentUser = () =>
  handleRequest(async () => {
    await auth.authStateReady();
    const userId = auth.currentUser?.uid;
    if (!userId) return null;

    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    return userDoc.data() as IUser || null;
  });

export const fetchUserDetails = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) throw new Error(ERRORS.REQUEST_ERROR);

  const { nickName, photoUrl } = userDoc.data();
  return { id: userId, nickName: nickName as string, photoUrl: photoUrl as string };
};
