import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../store/commentsSlice';
import styles from '../styles/PostComments.module.css';

const AddComment = ({ postId }: { postId: number }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text || !name) {
      setError('All fields must be filled in!');
      return;
    }

    setError('');
    const newComment = {
      id: Date.now(),
      postId,
      text,
      name,
    };

    dispatch(addComment(newComment));
    setText('');
    setName('');
  };

  return (
    <form onSubmit={handleAddComment} className="create_form">
      <textarea
        className={styles.add_comment}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment"
      />
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error &&
        <p className="error">
            {error}
        </p>
      }
      <button
        className="red_button main_button"
        type="button"
        onClick={() => {
          setText('');
          setName('');
        }}
      >
        Cancel
      </button>
      <button className="main_button" type="submit">
        Add Comment
      </button>
    </form>
  );
};

export default AddComment;