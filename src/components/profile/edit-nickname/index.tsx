import useForm from 'hooks/ui/useForm';
import useGetUser from 'hooks/users/useGetUser';
import { useState } from 'react';
import { updateNickName } from 'services/users/user-nickname';
import { validateNickName } from 'utils/form-validation';
import { invalidateUser } from 'utils/invalidate';
import * as S from './styles';

const NickNameForm = () => {
  const [onEdit, setOnEdit] = useState(false);
  const { user } = useGetUser();
  const { isLoading, handleSubmit, register, errors, reset } = useForm(['nickName'], {
    nickName: user?.nickName,
  });

  const toggleOnEdit = () => setOnEdit((prev) => !prev);
  const onSubmit = handleSubmit(updateNickName, async () => {
    await invalidateUser();
    reset();
    toggleOnEdit();
  });
  return (
    <>
      {!onEdit ? (
        <S.NickName>
          <h2>{user?.nickName}</h2>
          <button onClick={toggleOnEdit}>닉네임 수정</button>
        </S.NickName>
      ) : (
        <S.NickNameForm onSubmit={onSubmit}>
          <label htmlFor="nickName" className="sr-only">
            닉네임
          </label>
          <input id="nickName" {...register('nickName', validateNickName)} />
          {errors.nickName && <p>{errors.nickName}</p>}
          {errors.common && <p>{errors.common}</p>}
          <S.NickNameButtons>
            <button type="submit" disabled={isLoading}>
              저장
            </button>
            <button type="button" onClick={toggleOnEdit} disabled={isLoading}>
              취소
            </button>
          </S.NickNameButtons>
        </S.NickNameForm>
      )}
    </>
  );
};

export default NickNameForm;