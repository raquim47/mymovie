import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { uuidv4 } from '@firebase/util';
import { ChangeEvent } from 'react';
import { getCurrentUser, storage } from 'utils/firebase';
import useUsersMutation from './useUsersMutation';
import { updateDoc } from 'firebase/firestore';

const updateUserImage = async (file: File | null) => {
  const { userRef, userId, userData } = await getCurrentUser();
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

const useSetUserImage = () => {
  const { mutate, isPending } = useUsersMutation(updateUserImage);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      mutate(file);
      event.target.value = '';
    }
  };
  const handleRemove = () => mutate(null);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = require('assets/profile.png');
  };

  return { handleUpload, handleRemove, handleImageError, isPending };
};

export default useSetUserImage;
