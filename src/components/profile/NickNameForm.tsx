import useSetNickName from 'hooks/users/useSetNickName';
import ST from './styles';

const NickNameForm = () => {
  const { onEdit, toggleOnEdit, nickName, inputRef, handleSubmit, isLoading } =
    useSetNickName();

  return (
    <>
      {!onEdit ? (
        <ST.NickName>
          <h2>{nickName}</h2>
          <button onClick={toggleOnEdit}>닉네임 수정</button>
        </ST.NickName>
      ) : (
        <ST.NickNameForm onSubmit={handleSubmit}>
          <input
            name="nickName"
            defaultValue={nickName}
            ref={inputRef}
            maxLength={8}
            minLength={2}
          />
          <div className="buttons">
            <button type="submit" disabled={isLoading}>
              저장
            </button>
            <button type="button" onClick={toggleOnEdit} disabled={isLoading}>
              취소
            </button>
          </div>
        </ST.NickNameForm>
      )}
    </>
  );
};

export default NickNameForm;
