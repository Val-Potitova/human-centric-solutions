import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import commentsReducer from './commentsSlice';
import { createSelector } from 'reselect';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
});

const selectCommentsByPostId = (state: RootState, postId: number) => state.comments[postId];

export const memoizedCommentsSelector = createSelector(
  [selectCommentsByPostId],
  (comments) => comments || []
);

let previousState = store.getState();

store.subscribe(() => {
  const currentState = store.getState();

  console.log('%c Previous State:', 'color: gray;', previousState);
  console.log('%c Current State:', 'color: green;', currentState);

  if (previousState.posts !== currentState.posts) {
    const addedPosts = currentState.posts.posts.filter(
      (post) => !previousState.posts.posts.some((prevPost) => prevPost.id === post.id)
    );
    const removedPosts = previousState.posts.posts.filter(
      (post) => !currentState.posts.posts.some((currPost) => currPost.id === post.id)
    );

    if (addedPosts.length > 0) {
      console.log('%c Added Posts:', 'color: blue;', addedPosts);
    }
    if (removedPosts.length > 0) {
      console.log('%c Removed Posts:', 'color: red;', removedPosts);
    }
  }

  Object.keys(currentState.comments).forEach((postId) => {
    const postIdNumber = Number(postId);
    const previousComments = previousState.comments[postIdNumber] || [];
    const currentComments = currentState.comments[postIdNumber] || [];

    const addedComments = currentComments.filter(
      (comment) => !previousComments.some((prevComment) => prevComment.id === comment.id)
    );
    const removedComments = previousComments.filter(
      (comment) => !currentComments.some((currComment) => currComment.id === comment.id)
    );

    if (addedComments.length > 0) {
      console.log(`%c Added Comments for Post ${postIdNumber}:`, 'color: green;', addedComments);
    }
    if (removedComments.length > 0) {
      console.log(`%c Removed Comments for Post ${postIdNumber}:`, 'color: orange;', removedComments);
    }
  });

  const removedCommentPosts = Object.keys(previousState.comments).filter(
    (postId) => !currentState.comments[Number(postId)]
  );

  removedCommentPosts.forEach((postId) => {
    const postIdNumber = Number(postId);
    const removedComments = previousState.comments[postIdNumber];
    console.log(`%c All Comments for Post ${postIdNumber} were removed:`, 'color: red;', removedComments);
  });

  previousState = currentState;
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
