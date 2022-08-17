import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import { createPost, fetchPosts } from '../api';

const postsAdapter = createEntityAdapter({
  selectId: (post) => post._id,
});

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const getPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const { data } = await fetchPosts();
    return data;
  } catch (error) {
    return error.message;
  }
});

export const addPost = createAsyncThunk('posts/addPost', async (newPost) => {
  try {
    const { data } = await createPost(newPost);
    return data;
  } catch (error) {
    return error.message;
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        postsAdapter.setAll(state, payload);
        state.status = 'succeeded';
      })
      .addCase(getPosts.rejected, (state, { payload }) => {
        state.error = payload;
        state.status = 'failed';
      })
      .addCase(addPost.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(addPost.fulfilled, (state, { payload }) => {
        postsAdapter.addOne(state, payload);
        state.status = 'succeeded';
      })
      .addCase(addPost.rejected, (state, { payload }) => {
        state.error = payload;
        state.status = 'failed';
      });
  },
});

export const { selectAll: selectPosts, selectById: selectPostById } =
  postsAdapter.getSelectors((state) => state.posts);

export default postsSlice.reducer;
