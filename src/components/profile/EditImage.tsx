import { useAppSelector } from 'hooks/useAppSelector';
import { useSetUserImage } from 'hooks/user';
import { ChangeEvent } from 'react';
import Buttons from 'components/ui/buttons';
import ST from './styles';

const EditImage = () => {
  const photoUrl = useAppSelector((state) => state.user.userData?.photoUrl);
  const { mutate: handleImage, isLoading } = useSetUserImage();

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleImage(file);
  };

  return (
    <ST.EditImage>
      <img src={photoUrl || require('assets/profile.png')} alt="프로필 이미지" />
      <input id="file" type="file" accept="image/*" onChange={handleUpload} />
      <Buttons.Label htmlFor="file" className={isLoading ? 'disabled' : ''}>
        이미지 업로드
      </Buttons.Label>
      <Buttons.Base disabled={isLoading} onClick={() => handleImage(null)}>
        이미지 삭제
      </Buttons.Base>
    </ST.EditImage>
  );
};

export default EditImage;
