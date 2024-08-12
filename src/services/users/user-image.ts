import { updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'utils/firebase';
import { uuidv4 } from '@firebase/util';
import { getCurrentUser } from './user';

export const updateUserImage = async (file: File | null) => {
  const { userId, userRef, userData } = await getCurrentUser();
  const photoUrl = userData.photoUrl;

  if (photoUrl) {
    const photoRef = ref(storage, photoUrl);
    await deleteObject(photoRef);
  }

  if (file) {
    const storageRef = ref(storage, `user/userPhoto/${userId}/${uuidv4()}`);
    const snapshot = await uploadBytes(storageRef, file);
    const newPhotoUrl = await getDownloadURL(snapshot.ref);
    await updateDoc(userRef, { photoUrl: newPhotoUrl });
  } else {
    await updateDoc(userRef, { photoUrl: '' });
  }
};
