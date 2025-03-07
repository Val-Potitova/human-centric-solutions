import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { removeComment } from '../store/commentsSlice';
import styles from '../styles/PostComments.module.css';
import deleteDark from '../assets/delete_dark.png';
import deleteLight from '../assets/delete_light.png';
import { useTheme } from './ThemeContext';
import WindowDelete from './WindowDelete';
import { useState, useCallback } from 'react';
import { memoizedCommentsSelector } from '../store/store';

const PostComments = ({ postId }: { postId: number }) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [showWindow, setShowWindow] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);

  const comments = useSelector((state: RootState) => memoizedCommentsSelector(state, postId));

  const handleDeleteComment = useCallback(
    (commentId: number) => {
      setSelectedCommentId(commentId);
      setShowWindow(true);
    },
    []
  );
  
  const deleteComment = useCallback(() => {
    if (selectedCommentId !== null) {
      dispatch(removeComment({ postId, commentId: selectedCommentId }));
      setSelectedCommentId(null);
      setShowWindow(false);
    }
  }, [dispatch, selectedCommentId, postId]);

  return (
    <>
      <h4 className={styles.title}>Comments</h4>
      {comments.length ? (
        comments.map((comment, index) => (
          <div
            key={comment.id}
            className={`${styles.comment_container}
              ${index === comments.length - 1 ? styles.last_comment : ''}`}
          >
            <div className={styles.comment}>
              <p className={styles.comment__name}>{comment.name}:</p>
              <p className={styles.comment__text}>{comment.text}</p>
            </div>
            {showWindow && selectedCommentId === comment.id ?
              <WindowDelete item="comment" deleteItem={deleteComment} setShowWindow={setShowWindow} />
              : <button
                  className={styles.comment__delete}
                  type="button"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  <img src={theme === 'light' ? deleteDark : deleteLight} alt="delete" />
                </button>
            }
          </div>
        ))
      ) : (
        <p className={styles.no_comments}>No comments yet...</p>
      )}
    </>
  );
};

export default PostComments;
