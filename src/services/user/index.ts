import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from 'services/firebase';
import { uuidv4 } from '@firebase/util';

const getUserRefAndId = async () => {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error('No User ID found.');
  return { userRef: doc(db, 'users', userId), userId };
};

// 이미지 수정, 삭제
export const updateUserImage = async (file: File | null) => {
  const { userRef, userId } = await getUserRefAndId();
  const userData = await getDoc(userRef);
  const imageUrl = userData.data()?.photoUrl;

  if (imageUrl) {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  }

  if (file) {
    const storageRef = ref(storage, `user/userPhoto/${userId}/${uuidv4()}`);
    const snapshot = await uploadBytes(storageRef, file);
    const newImageUrl = await getDownloadURL(snapshot.ref);
    await updateDoc(userRef, { photoUrl: newImageUrl });
  } else {
    await updateDoc(userRef, { photoUrl: null });
  }
};

export const updateNickName = async (nickName: string) => {
  const user = auth.currentUser;
  try {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { nickName });
    }
  } catch (error) {
    alert('요청이 실패했습니다.');
  }
};
