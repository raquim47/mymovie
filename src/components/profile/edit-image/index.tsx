import Buttons from 'components/ui/buttons';
import * as S from './styles';
import Loader from 'components/ui/Loader';
import useGetUser from 'hooks/users/useGetUser';
import { useMutation } from '@tanstack/react-query';
import { ChangeEvent } from 'react';
import { updateUserImage } from 'services/users/user-image';
import { invalidateUser } from 'utils/invalidate';

const EditImage = () => {
  const { user } = useGetUser();
  const { mutate, isPending } = useMutation({
    mutationFn: updateUserImage,
    onSuccess: invalidateUser,
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
          <img
            src={user?.photoUrl || require('assets/profile.png')}
            alt={`${user?.nickName} 프로필 이미지`}
            onError={(e) => (e.currentTarget.src = require('assets/profile.png'))}
          />
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
