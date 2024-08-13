import * as S from './styles';
import WatchListAction from './watch-list-action';
import RatingAction from './rating-action';
import { IMovieSummary } from 'services/movies/types';
import CommentForm from './comment-form';
import CommentAction from './comment-action';
import useCurrentUser from 'hooks/useCurrentUser';
import { useState } from 'react';

const UserActions = ({ movie }: { movie: IMovieSummary }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const { user } = useCurrentUser();
  const comment = user?.reviewed[movie.id]?.comment || '';
  const openCommentForm = () => setShowCommentForm(true);
  const closeCommentForm = () => setShowCommentForm(false);
  return (
    <S.ActionsBlock>
      <h3 className="sr-only">사용자 액션</h3>
      {showCommentForm && (
        <CommentForm
          comment={comment}
          movieId={movie.id}
          closeCommentForm={closeCommentForm}
        />
      )}
      {!showCommentForm && (
        <S.ActionList>
          <WatchListAction movie={movie} />
          <RatingAction movie={movie} />
          <CommentAction
            comment={comment}
            movieId={movie.id}
            openCommentForm={openCommentForm}
          />
        </S.ActionList>
      )}
    </S.ActionsBlock>
  );
};

export default UserActions;
