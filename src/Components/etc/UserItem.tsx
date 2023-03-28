import styled from 'styled-components';
import { IUserData } from './../../store';
import { IUserInfo } from '../detail/Detail';

const Wrapper = styled.div`
  /* width: 250px; */
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  padding: 12px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  h5 {
    font-size: 14px;
    font-weight: 400;
  }
`;

const Star = styled.div`
  display: flex;
  align-items: center;
  border-radius: 6px;
  margin-bottom: 2px;
  svg {
    width: 14px;
    height: 14px;
  }
  span {
    display: inline-block;
    margin-top: 2px;
    margin-left: 4px;
    font-size: 14px;
    font-weight: 600;
  }
`;

const Comment = styled.p`
  width: 65%;
  margin-left: auto;
  margin-right: 2%;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

function UserItem({ nickName, userPhoto, rating, comment }: IUserInfo) {
  return (
    <Wrapper>
      <img
        src={userPhoto ? userPhoto : require('../../assets/profile.png')}
        alt='유저 이미지'
      />
      <h5>{nickName}</h5>
      {rating && (
        <Star>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <path
              fill='#ffcc33'
              d='M12 17.98l-6.015 4.392c-.508.372-1.194-.126-.998-.725l2.317-7.081-6.035-4.367c-.51-.369-.247-1.175.382-1.174l7.447.016 2.286-7.091c.192-.6 1.04-.6 1.233 0l2.286 7.09 7.447-.015c.629-.001.89.805.38 1.174l-6.033 4.367 2.316 7.08c.196.6-.49 1.098-.999.726L12 17.98z'
            />
          </svg>
          <span>{rating}</span>
        </Star>
      )}
      {comment && <Comment>{comment}</Comment>}
    </Wrapper>
  );
}

export default UserItem;
