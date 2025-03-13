import { useLocation, useNavigate } from 'react-router';
import styles from '../styles/Post.module.css';
import '../styles/themes.css';
import Like from './Like';
import PostComments from './PostComments';
import AddComment from './AddComment';
import deleteDark from '../assets/delete_dark.png';
import deleteLight from '../assets/delete_light.png';
import { useTheme } from './ThemeContext';
import { useDispatch } from 'react-redux';
import { removePost } from '../store/postsSlice';
import { AppDispatch } from '../store/store';
import WindowDelete from './WindowDelete';
import { useState } from 'react';

function Post() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { state } = location;
  const { theme } = useTheme();
  const [showWindow, setShowWindow] = useState(false);
  const navigate = useNavigate();

  let post = state?.post;

  const handleDelete = () => {
    setShowWindow(true);
  };

  const deletePost = () => {
    setShowWindow(false);
    if (post) {
      dispatch(removePost(post.id));
    }
    navigate('/');
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!post) {
    return (
      <div className={styles.not_found}>
        Post not found
      </div>
    );
  }

  return (
    <div className={styles.post}>
        <div className={styles.header}>
          <p className={styles.post__date}>
              {formatDate(post.date)}
          </p>
          {showWindow ?
            <WindowDelete item="post" deleteItem={deletePost} setShowWindow={setShowWindow} />
            : <button className={styles.post_delete} type='button' onClick={handleDelete}>
              <img src={theme === 'light' ? deleteDark : deleteLight} alt="delete" />
            </button>
          }
        </div>
        <div className={styles.header}>
            <h3 className={styles.post__title}>
                {post.title}
            </h3>
            <Like component='Post' id={post.id}/>
        </div>
        <p className={styles.post__body}>
            {post.body}
        </p>
        <img src={post.image} alt={post.title} className={styles.post__image} />
        <PostComments postId={post.id}/>
        <AddComment postId={post.id}/>
    </div>
  );
}

export default Post;