import { useQueries } from '@tanstack/react-query';
import ProfileImage from 'components/profile/profile-image';
import Loader from 'components/ui/Loader';
import ReactStars from 'react-stars';
import { IReviews } from 'services/movies/types';
import { fetchUserDetails } from 'services/users/user';
import formatDate from 'utils/date';
import * as S from './styles';

const Reviews = ({ reviews }: { reviews: IReviews }) => {
  const userQueries = useQueries({
    queries: Object.keys(reviews).map((userId) => ({
      queryKey: ['users', userId],
      queryFn: () => fetchUserDetails(userId),
    })),
  });

  if (userQueries.some((query) => query.isLoading)) {
    return <Loader />;
  }
  return (
    <S.Reviews>
      <ul>
        {userQueries.map((userQuery) => {
          const user = userQuery.data;
          if (!user) return null;
          const review = reviews[user.id];

          return (
            <S.Review key={user.id}>
              <ProfileImage imageUrl={user.photoUrl} name={user.nickName} />
              <S.UserInfo>
                <h4>{user.nickName}</h4>
                {!!review.rating && <ReactStars edit={false} value={review.rating} />}
              </S.UserInfo>
              {!!review.comment && <p>{review.comment}</p>}
              <time dateTime={new Date(review.timestamp).toISOString()}>
                {formatDate(review.timestamp)}
              </time>
            </S.Review>
          );
        })}
      </ul>
    </S.Reviews>
  );
};

export default Reviews;
