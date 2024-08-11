import Buttons from 'components/ui/buttons';
import ST from './styles';
import Loader from 'components/ui/Loader';
import useSetUserImage from 'hooks/users/useSetUserImage';
import useGetUser from 'hooks/users/useGetUser';

const EditImage = () => {
  const { user } = useGetUser();

  const { handleUpload, handleRemove, handleImageError, isPending } = useSetUserImage();

  return (
    <ST.EditImage>
      <div className="profile-image">
        {isPending ? (
          <Loader />
        ) : (
          <img
            src={user?.photoUrl || require('assets/profile.png')}
            alt="프로필 이미지"
            onError={handleImageError}
          />
        )}
      </div>
      <input id="file" type="file" accept="image/*" onChange={handleUpload} />
      <Buttons.Label htmlFor="file" className={isPending ? 'disabled' : ''}>
        이미지 업로드
      </Buttons.Label>
      <Buttons.Base disabled={isPending} onClick={handleRemove}>
        이미지 삭제
      </Buttons.Base>
    </ST.EditImage>
  );
};

export default EditImage;
