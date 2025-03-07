import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Post } from './types';
import styles from '../styles/FeedItem.module.css';
import '../styles/themes.css';
import Like from './Like';

function FeedItem({ post }: { post: Post }) {
  const [isFull, setIsFull] = useState(false);
  const navigate = useNavigate();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const cutText = (text: string) => {
    const textSplit = text.split(' ');
    let result = '';
    for (let i=0; i < 5; i++) {
      result += textSplit[i] + ' ';
    }
    result += '... ';

    return result;
  }

  return (
      <div className={styles.container}>
          <div className={styles.post}>
              <div className={styles.post__header}>
                  <h3 className={styles.post__title}>{post.title}</h3>
                  <p className={styles.post__date}>{formatDate(post.date)}</p>
              </div>
              <p className={styles.post__body}>
                {post.body.split(' ').length <= 5 || isFull
                  ? post.body
                  : <>
                      {cutText(post.body)}
                      <button className={styles.see_more} onClick={() => setIsFull(true)}>see more</button>
                    </>
                }
              </p>
              <div className={styles.img_container}>
                <img className={styles.post__img} src={post.image} alt={post.title} />
              </div>
              <div className={styles.post__footer}>
                <Like component="FeedItem" id={post.id} />
                <button className="main_button" onClick={() => navigate(`/post/${post.id}`, { state: {post} })} type="button">
                  Open
                </button>
              </div>
          </div>
      </div>
  );
}

export default FeedItem;
