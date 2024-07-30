import ST from './styles';
import { IMovieSummary } from 'hooks/movies/types';
import WatchListAction from './watch-list-action';
import RatingAction from './rating-action';
import CommentAction from './comment/CommentAction';
import CommentForm from './comment/CommentForm';
import useSetMovieComment from 'hooks/users/useSetMovieComment';

const UserActions = ({ movie }: { movie: IMovieSummary }) => {
  const {
    onCommentForm,
    onComment,
    offComment,
    submitComment,
    removeComment,
    isPending,
  } = useSetMovieComment(movie.id);

  return (
    <ST.Actions>
      <h3 className="sr-only">사용자 액션</h3>
      {onCommentForm ? (
        <CommentForm
          offComment={offComment}
          submitComment={submitComment}
          isPending={isPending}
        />
      ) : (
        <ul>
          <WatchListAction movie={movie} />
          <RatingAction movie={movie} />
          <CommentAction
            onComment={onComment}
            removeComment={removeComment}
            isPending={isPending}
          />
        </ul>
      )}
    </ST.Actions>
  );
};

export default UserActions;
