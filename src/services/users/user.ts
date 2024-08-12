import { ERRORS } from 'utils/errors';
import { auth, getUserDoc } from 'utils/firebase';
import handleRequest from 'utils/request-handler';

export const getCurrentUser = async () => {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error(ERRORS.INVALID_USER);

  const { userRef, userData } = await getUserDoc(userId);
  if (!userData) throw new Error(ERRORS.INVALID_USER);

  return { userRef, userData, userId };
};

export const requestUser = () =>
  handleRequest(async () => {
    await auth.authStateReady();
    const userId = auth.currentUser?.uid;
    if (!userId) return null;

    const user = await getUserDoc(userId);
    return user.userData;
  });
