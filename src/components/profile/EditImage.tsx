import { useAppSelector } from 'hooks/useAppSelector';
import { useSetUserImage } from 'hooks/user';
import Buttons from 'components/ui/buttons';
import ST from './styles';
import Loader from 'components/ui/Loader';
import React from 'react';

const EditImage = () => {
  const photoUrl = useAppSelector((state) => state.user.userData?.photoUrl);
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = require('assets/profile.png');
  };
  const { imageUpload, imageRemove, isLoading } = useSetUserImage();

  return (
    <ST.EditImage>
      <div className="profile-image">
        {isLoading ? (
          <Loader />
        ) : (
          <img
            src={photoUrl || require('assets/profile.png')}
            alt="프로필 이미지"
            onError={handleImageError}
          />
        )}
      </div>
      <input id="file" type="file" accept="image/*" onChange={imageUpload} />
      <Buttons.Label htmlFor="file" className={isLoading ? 'disabled' : ''}>
        이미지 업로드
      </Buttons.Label>
      <Buttons.Base disabled={isLoading} onClick={imageRemove}>
        이미지 삭제
      </Buttons.Base>
    </ST.EditImage>
  );
};

export default EditImage;
