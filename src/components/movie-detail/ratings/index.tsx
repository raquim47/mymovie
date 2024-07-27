import ReactStars from 'react-stars';
import { IRatings } from 'services/movies/types';
import ST from './styles';

const Ratings = ({ ratings }: { ratings: IRatings }) => {
  return (
    <ST.Ratings>
      <ul>
        {Object.entries(ratings).map(([userId, data]) => (
          <ST.Rating key={userId}>
            <img src={data.photoUrl} alt={`${data.nickName} 프로필 이미지`} />
            <div className="user-info">
              <h4>{data.nickName}</h4>
              <ReactStars edit={false} value={data.rating} />
            </div>
            <p>
              코멘트 내용코멘트 내용코멘트 내용코멘트 내용코멘트 내용코멘트 내용코멘트
              내용코멘트 내용코멘트 내용코멘트 내용코멘트 내용코멘트 내용코멘트 내용코멘트
              내용코멘트 내용코멘트 내용코멘트 내용코멘트 내용코멘트 내용코멘트 내용코멘트
              내용코멘트 내용코멘트 내용코멘트 내용코멘트 내용코멘트 내용코멘트 내용코멘트
              내용코멘트 내용코멘트 내용코멘트 내용코멘트 내용코멘트 내용코멘트 내용코멘트
              내용코멘트 내용코멘트 내용코멘트 내용코멘트 내용코멘트 내용코멘트 내용코멘트
              내용코멘트 내용코멘트 내용코멘트 내용코멘트 내용코멘트 내용코멘트 내용코멘트
              내용
            </p>
          </ST.Rating>
        ))}
      </ul>
    </ST.Ratings>
  );
};

export default Ratings;
