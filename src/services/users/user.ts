import { ERRORS } from 'utils/errors';
import { auth, db, getUserDoc } from 'services/firebase';
import { handleRequest } from 'utils/request-handler';
import { doc, getDoc } from 'firebase/firestore';

// getLoggedInUser
export const getCurrentUser = async () => {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error(ERRORS.INVALID_USER);

  const { userRef, userData } = await getUserDoc(userId);
  if (!userData) throw new Error(ERRORS.INVALID_USER);

  return { userRef, userData, userId };
};

export const fetchCurrentUser = () =>
  handleRequest(async () => {
    await auth.authStateReady();
    const userId = auth.currentUser?.uid;
    if (!userId) return null;
    const user = await getUserDoc(userId);
    return user.userData;
  });

export const fetchUserDetails = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) throw new Error(ERRORS.REQUEST_ERROR);

  const { nickName, photoUrl } = userDoc.data();
  return { id: userId, nickName: nickName as string, photoUrl: photoUrl as string };
};
