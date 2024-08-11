import { updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { getCurrentUser } from 'utils/firebase';
import { ERRORS } from 'utils/errors';
import useUsersMutation from './useUsersMutation';
import useGetUser from './useGetUser';

const updateNickName = async (nickName: string) => {
  if (nickName.length < 2) throw new Error(ERRORS.INVALID_NICKNAME);

  const { userRef } = await getCurrentUser();
  await updateDoc(userRef, { nickName });
};

const useSetNickName = () => {
  const [onEdit, setOnEdit] = useState(false);
  const { mutate, isPending } = useUsersMutation(updateNickName);
  const { user } = useGetUser();
  const toggleOnEdit = () => setOnEdit((prev) => !prev);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nickNameValue = formData.get('nickName') as string;
    
    if (nickNameValue === user?.nickName) {
      toggleOnEdit();
    } else {
      mutate(nickNameValue, { onSuccess: () => toggleOnEdit() });
    }
  };

  return { onEdit, toggleOnEdit, nickName: user?.nickName, handleSubmit, isPending };
};

export default useSetNickName;
