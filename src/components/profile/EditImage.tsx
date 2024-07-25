import { useAppSelector } from 'hooks/useAppSelector';
import Buttons from 'components/ui/buttons';
import ST from './styles';
import Loader from 'components/ui/Loader';
import useSetUserImage from 'hooks/users/useSetUserImage';

const EditImage = () => {
  const photoUrl = useAppSelector((state) => state.user.userData?.photoUrl);
 
  const { handleUpload, handleRemove, handleImageError, isLoading } = useSetUserImage();

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
      <input id="file" type="file" accept="image/*" onChange={handleUpload} />
      <Buttons.Label htmlFor="file" className={isLoading ? 'disabled' : ''}>
        이미지 업로드
      </Buttons.Label>
      <Buttons.Base disabled={isLoading} onClick={handleRemove}>
        이미지 삭제
      </Buttons.Base>
    </ST.EditImage>
  );
};

export default EditImage;
