import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import NEWS from '../assets/news.json';
import { Post } from '../components/types.tsx';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  return NEWS as Post[];
});

const initialState = {
  posts: [] as Post[], 
  loading: false,
  error: '',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    removePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        const apiPosts = action.payload;
        
        const combinedPosts = [...apiPosts, ...state.posts].reduce<Post[]>((acc, post) => {
          if (!acc.some((p) => p.id === post.id)) {
            acc.push(post);
          }
          return acc;
        }, []);
      
        state.posts = combinedPosts;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      });
  },
});
  
export const { addPost, removePost } = postsSlice.actions;
export default postsSlice.reducer;
  