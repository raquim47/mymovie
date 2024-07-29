import ReactStars from 'react-stars';
import { IReviews } from 'services/movies/types';
import formatDate from 'utils/date';
import ST from './styles';

const Reviews = ({ reviews }: { reviews?: IReviews }) => {
  if (!reviews) return null;

  return (
    <ST.Reviews>
      <ul>
        {Object.entries(reviews).map(([userId, data]) => (
          <ST.Review key={userId}>
            <img src={data.photoUrl} alt={`${data.nickName} 프로필 이미지`} />
            <div className="user-info">
              <h4>{data.nickName}</h4>
              <ReactStars edit={false} value={data.rating} />
            </div>
            <p>{data.comment}</p>
            <time dateTime={new Date(data.timestamp).toISOString()}>
              {formatDate(data.timestamp)}
            </time>
          </ST.Review>
        ))}
      </ul>
    </ST.Reviews>
  );
};

export default Reviews;
