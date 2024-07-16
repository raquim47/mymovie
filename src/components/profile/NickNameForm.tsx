import { useAppSelector } from 'hooks/useAppSelector';
import { useSetNickName } from 'hooks/user';
import { useRef, useState } from 'react';
import Styled from './styled';

const NickNameForm = () => {
  const [editNick, setEditNick] = useState(false);
  const { mutate: setNickName, isLoading } = useSetNickName();
  const nickName = useAppSelector((state) => state.user.userData?.nickName);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleEditNick = () => setEditNick((prev) => !prev);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputRef.current) {
      const nickNameValue = inputRef.current.value;
      if (nickNameValue === nickName) {
        toggleEditNick();
        return;
      } else {
        setNickName(nickNameValue, {
          onSuccess: () => {
            toggleEditNick();
          },
        });
      }
    }
  };

  return (
    <>
      {!editNick ? (
        <Styled.NickName>
          <h2>{nickName}</h2>
          <button onClick={toggleEditNick}>닉네임 수정</button>
        </Styled.NickName>
      ) : (
        <Styled.NickNameForm onSubmit={handleSubmit}>
          <input
            name="nickName"
            ref={inputRef}
            defaultValue={nickName}
            maxLength={8}
            minLength={2}
          />
          <div className="buttons">
            <button type="submit" disabled={isLoading}>
              저장
            </button>
            <button type="button" onClick={toggleEditNick} disabled={isLoading}>
              취소
            </button>
          </div>
        </Styled.NickNameForm>
      )}
    </>
  );
};

export default NickNameForm;
