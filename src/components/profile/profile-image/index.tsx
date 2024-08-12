import * as S from './styles';

const ProfileImage = ({ imageUrl, name }: { imageUrl?: string; name?: string }) => {
  return (
    <S.RoundImage
      src={imageUrl || require('assets/profile.png')}
      alt={name ? `${name} 프로필 이미지` : '프로필 이미지'}
      onError={(e) => (e.currentTarget.src = require('assets/profile.png'))}
    />
  );
};

export default ProfileImage;
