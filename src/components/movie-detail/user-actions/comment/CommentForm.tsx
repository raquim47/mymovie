import useGetMyMovieReview from 'hooks/users/useGetMyMovieReview';
import ST from './styles';

const CommentForm = ({
  offComment,
  submitComment,
  isPending,
}: {
  offComment: () => void;
  submitComment: (event: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
}) => {
  const { comment } = useGetMyMovieReview();
  return (
    <ST.CommentForm onSubmit={submitComment}>
      <textarea
        placeholder="작품에 대한 코멘트를 남겨주세요"
        required
        defaultValue={comment}
        maxLength={80}
        name="comment"
      />
      <ST.Buttons>
        <button type="submit" disabled={isPending}>
          저장
        </button>
        <button type="button" onClick={offComment} disabled={isPending}>
          취소
        </button>
      </ST.Buttons>
    </ST.CommentForm>
  );
};

export default CommentForm;
