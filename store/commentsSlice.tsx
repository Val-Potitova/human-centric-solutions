import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostComment } from '../components/types';

interface CommentsState {
  [postId: number]: PostComment[];
}

const initialState: CommentsState = {};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<PostComment>) => {
      const { postId } = action.payload;
      if (!state[postId]) {
        state[postId] = [];
      }

      const commentExists = state[postId].some(comment => comment.id === action.payload.id);
      if (!commentExists) {
        state[postId].push(action.payload);
      }
    },
    removeComment: (state, action: PayloadAction<{ postId: number; commentId: number }>) => {
      const { postId, commentId } = action.payload;
      if (state[postId]) {
        state[postId] = state[postId].filter(comment => comment.id !== commentId);
        if (state[postId].length === 0) {
          delete state[postId];
        }
      }
    },
  },
});

export const { addComment, removeComment } = commentsSlice.actions;
export default commentsSlice.reducer;