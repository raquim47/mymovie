import { updateDoc } from 'firebase/firestore';
import { useAppSelector } from 'store';
import { useRef, useState } from 'react';
import { getCurrentUser } from 'utils/firebase';
import { ERRORS } from 'utils/error';
import useUsersMutation from './useUsersMutation';

const updateNickName = async (nickName: string) => {
  if (nickName.length < 2) throw new Error(ERRORS.INVALID_NICKNAME);

  const { userRef } = await getCurrentUser();
  await updateDoc(userRef, { nickName });
};

const useSetNickName = () => {
  const [onEdit, setOnEdit] = useState(false);
  const { mutate, isPending } = useUsersMutation(updateNickName);
  const nickName = useAppSelector((state) => state.user.userData?.nickName);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleOnEdit = () => setOnEdit((prev) => !prev);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!inputRef.current) return;

    const nickNameValue = inputRef.current.value;
    if (nickNameValue === nickName) {
      toggleOnEdit();
    } else {
      mutate(nickNameValue, { onSuccess: () => toggleOnEdit() });
    }
  };

  return { onEdit, toggleOnEdit, nickName, inputRef, handleSubmit, isPending };
};

export default useSetNickName;
