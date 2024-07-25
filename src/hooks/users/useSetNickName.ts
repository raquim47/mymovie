import { useAppSelector } from 'hooks/useAppSelector';
import { useRef, useState } from 'react';
import { updateNickName } from 'services/user';
import useUsersMutation from './useUsersMutation';

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
