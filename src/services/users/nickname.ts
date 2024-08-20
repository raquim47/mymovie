import { updateDoc } from 'firebase/firestore';
import { handleRequest } from 'utils/request-handler';
import { getLoggedInUser } from './user';

export const updateNickName = ({ nickName }: { nickName: string }) =>
  handleRequest(async () => {
    const { userRef } = await getLoggedInUser();
    await updateDoc(userRef, { nickName });
  });
