import { updateDoc } from 'firebase/firestore';
import { handleRequest } from 'utils/request-handler';
import { getCurrentUser } from './user';

export const updateNickName = ({ nickName }: { nickName: string }) =>
  handleRequest(async () => {
    const { userRef } = await getCurrentUser();
    await updateDoc(userRef, { nickName });
  });
