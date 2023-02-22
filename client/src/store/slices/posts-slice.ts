import { createSlice } from '@reduxjs/toolkit';
import { fetchCreatePost } from 'store/async-actions/posts/createPost';
import { fetchDeletePost } from 'store/async-actions/posts/deletePost';
import { fetchGetPosts } from 'store/async-actions/posts/getPosts';
import { fetchIgnorePost } from 'store/async-actions/posts/ignorePost';
import { fetchUpdatePostText } from 'store/async-actions/posts/updatePostText';
import { IInitialStatePostst } from './interfaces/posts-slice-interfaces';
const initialState: IInitialStatePostst = {
  posts: [],
  allPostsCount: 0,
};

export const postsSlice = createSlice({
  name: 'Posts',
  initialState,
  reducers: {
    resetPostst: (state) => {
      state.posts = [];
    },
  },
  extraReducers(builder) {
    //=======================LOADING_POSTS========================================
    builder.addCase(fetchGetPosts.fulfilled, (state, action) => {
      state.posts = [...state.posts, ...action.payload.posts];
      state.allPostsCount = action.payload.length;
    });

    //=======================CREATE_POSTS========================================
    builder.addCase(fetchCreatePost.fulfilled, (state, action) => {
      state.posts = [action.payload, ...state.posts];
    });

    //=======================IGNORE_POSTS========================================
    builder.addCase(fetchIgnorePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    });

    //=======================DELETE_POSTS========================================
    builder.addCase(fetchDeletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload._id);
    });

    //=======================UPDATE_POSTS========================================
    builder.addCase(fetchUpdatePostText.fulfilled, (state, action) => {
      const { payload } = action;
      const newText = payload.text;
      state.posts.forEach((post) => {
        if (post._id === payload._id) {
          post.text = newText;
        }
      });
    });
  },
});

export default postsSlice.reducer;
