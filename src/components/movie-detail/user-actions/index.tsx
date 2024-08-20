import * as S from './styles';
import WatchListAction from './watch-list-action';
import RatingAction from './rating-action';
import { IMovie } from 'services/movies/types';
import CommentForm from './comment-form';
import CommentAction from './comment-action';
import useCurrentUser from 'hooks/useCurrentUser';
import { useState } from 'react';

const UserActions = ({ movie }: { movie: IMovie }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const { user } = useCurrentUser();
  const openCommentForm = () => setShowCommentForm(true);
  const closeCommentForm = () => setShowCommentForm(false);

  if (!user) return null;

  const movieSummary = {
    id: movie?.id,
    title: movie?.title,
    poster_path: movie?.poster_path,
    genres: movie?.genres,
    rating: user?.reviewed?.[movie.id]?.rating || 0,
    comment: user?.reviewed?.[movie.id]?.comment || '',
    isWatchList: !!user?.watchList?.[movie.id],
  };
  console.log(movieSummary);
  return (
    <S.ActionsBlock>
      <h3 className="sr-only">사용자 액션</h3>
      {showCommentForm && (
        <CommentForm movie={movieSummary} closeCommentForm={closeCommentForm} />
      )}
      {!showCommentForm && (
        <S.ActionList>
          <WatchListAction movie={movieSummary} />
          <RatingAction movie={movieSummary} />
          <CommentAction movie={movieSummary} openCommentForm={openCommentForm} />
        </S.ActionList>
      )}
    </S.ActionsBlock>
  );
};

export default UserActions;
