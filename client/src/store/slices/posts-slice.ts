import { createSlice } from '@reduxjs/toolkit';
import { fetchCreatePost } from 'store/async-actions/posts/createPost';
import { fetchDeletePost } from 'store/async-actions/posts/deletePost';
import { fetchGetPosts } from 'store/async-actions/posts/getPosts';
import { fetchIgnorePost } from 'store/async-actions/posts/ignorePost';
import { fetchUpdatePostText } from 'store/async-actions/posts/updatePostText';
import { IInitialStatePostst } from './iterfaces/PostsSliceInterfaces';

const initialState: IInitialStatePostst = {
  posts: [],
};

export const postsSlice = createSlice({
  name: 'Posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchGetPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(fetchGetPosts.rejected, (state, action) => {});

    builder.addCase(fetchCreatePost.fulfilled, (state, action) => {});
    builder.addCase(fetchCreatePost.rejected, (state, action) => {});

    builder.addCase(fetchIgnorePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    });
    builder.addCase(fetchIgnorePost.rejected, (state, action) => {});

    builder.addCase(fetchDeletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload._id);
    });
    builder.addCase(fetchDeletePost.rejected, (state, action) => {});

    builder.addCase(fetchUpdatePostText.fulfilled, (state, action) => {
      const { payload } = action;
      const newText = payload.text;
      state.posts = state.posts.map((post) => {
        if (post._id === payload._id) {
          post.text = newText;
          return post;
        }
        return post;
      });
    });
    builder.addCase(fetchUpdatePostText.rejected, (state, action) => {});
  },
});

export default postsSlice.reducer;
