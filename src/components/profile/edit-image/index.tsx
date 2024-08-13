import Buttons from 'components/ui/buttons';
import * as S from './styles';
import Loader from 'components/ui/Loader';
import useCurrentUser from 'hooks/useCurrentUser';
import { useMutation } from '@tanstack/react-query';
import { ChangeEvent } from 'react';
import { updateUserImage } from 'services/users/user-image';
import { invalidateUserMe } from 'utils/invalidate';
import ProfileImage from '../profile-image';

const EditImage = () => {
  const { user } = useCurrentUser();
  const { mutate, isPending } = useMutation({
    mutationFn: updateUserImage,
    onSuccess: invalidateUserMe,
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      mutate(file);
      event.target.value = '';
    }
  };

  return (
    <S.EditImage>
      <div className="profile-image">
        {isPending ? (
          <Loader />
        ) : (
          <ProfileImage imageUrl={user?.photoUrl} name={user?.nickName} />
        )}
      </div>
      <input id="file" type="file" accept="image/*" onChange={handleFileChange} />
      <Buttons.Label htmlFor="file" disabled={isPending}>
        이미지 업로드
      </Buttons.Label>
      <Buttons.Base disabled={isPending} onClick={() => mutate(null)}>
        이미지 삭제
      </Buttons.Base>
    </S.EditImage>
  );
};

export default EditImage;
