import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../store/postsSlice.tsx';
import { RootState, AppDispatch } from '../store/store.tsx';
import FeedItem from './FeedItem.tsx';
import styles from '../styles/Feed.module.css';
import '../styles/themes.css';

interface FeedProps {
  searchQuery: string;
}

function Feed({ searchQuery }: FeedProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts.length]);     

  const filteredPosts = useMemo(
    () =>
      posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [posts, searchQuery]
  );

  const visiblePosts = useMemo(
    () => filteredPosts.slice(0, visibleCount),
    [filteredPosts, visibleCount]
  );

  const loadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;
  if (!visiblePosts.length) return <p className={styles.error}>No posts{error}</p>;

  return (
    <>
      <div className={styles.feed}>
        {visiblePosts.map((post) => (
          <FeedItem key={post.id} post={post} />
        ))}
      </div>
      {visibleCount < filteredPosts.length && (
        <button className={`${styles.more} main_button`} onClick={loadMore} type="button">
          Load more
        </button>
      )}
      {filteredPosts.length === 0 && (
        <p className={styles.no_posts}>No posts found</p>
      )}
    </>
  );
}

export default Feed;
