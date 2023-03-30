import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { addComment, deleteComment } from '../../services/fbaseFunc';
import { IMovie } from '../../services/movieApi';

const Wrapper = styled.div`
  border-radius: 4px;
  padding: 16px;
  background-color: ${(props) => props.theme.black.middle};

  .comment_edit {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-left: 2%;
    button {
      position: relative;
      background-color: transparent;
      border: none;
      font-size: 12px;
      font-weight: 400;
      color: ${(props) => props.theme.white.darker};
      cursor: pointer;
    }

    button:hover {
      color: ${(props) => props.theme.purple};
    }

    button:first-child::before {
      position: absolute;
      left: calc(100% + 3px);
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 60%;
      background-color: ${(props) => props.theme.white.darker};
      content: '';
    }
  }
`;

const PostedComment = styled.div`
  display: flex;
  align-items: center;

  h4 {
    position: relative;
    padding-left: 10px;
    margin-right: 16px;
    font-size: 14px;
    font-weight: 600;
    color: ${(props) => props.theme.white.darker};
  }

  h4::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 10px;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: ${(props) => props.theme.white.darker};
  }

  p {
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 14px;
  }
`;

const CommentForm = styled.form`
  position: relative;
  display: flex;
  width: 100%;

  textarea {
    flex: 1;
    padding: 8px 16px;
    border-radius: 4px;
    box-sizing: border-box;
    outline: none;
    resize: none;
    ::placeholder {
      color: #a6adbd;
    }
  }

  .comment_error {
    position: absolute;
    width: 100%;
    top: 100%;
    color: ${(props) => props.theme.purple};
    font-size: 11px;
    margin-top: 2px;
    margin-left: 4px;
  }
`;

interface IDetailCommentForm {
  commentFormOpen: boolean;
  movieData: IMovie;
  myRate: number;
  myComment: string;
  toggleCommentForm: () => void;
}

function DetailCommentForm({
  commentFormOpen,
  movieData,
  myRate,
  myComment,
  toggleCommentForm,
}: IDetailCommentForm) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ comment: string }>({ mode: 'onChange' });

  // 코멘트 입력했을 때
  const handleCommentValid = ({ comment }: { comment: string }) => {
    if (!movieData || !myRate) return;
    addComment(movieData.id, comment);
    toggleCommentForm();
  };

  return (
    <>
      {commentFormOpen ? (
        <Wrapper>
          <CommentForm onSubmit={handleSubmit(handleCommentValid)}>
            <textarea
              {...register('comment', {
                required: '코멘트를 입력해주세요',
              })}
              defaultValue={myComment}
              placeholder='작품에 대한 코멘트를 남겨주세요'
            />
            {errors.comment && (
              <span className='comment_error'>{errors.comment.message}</span>
            )}
            <div className='comment_edit'>
              <button type='submit'>저장</button>
              <button onClick={toggleCommentForm}>취소</button>
            </div>
          </CommentForm>
        </Wrapper>
      ) : (
        myComment && (
          <Wrapper>
            <PostedComment>
              <h4>나의 코멘트</h4>
              <p>{myComment}</p>
              <div className='comment_edit'>
                <button onClick={toggleCommentForm}>수정</button>
                <button onClick={() => deleteComment(movieData.id)}>
                  삭제
                </button>
              </div>
            </PostedComment>
          </Wrapper>
        )
      )}
    </>
  );
}
export default DetailCommentForm;
