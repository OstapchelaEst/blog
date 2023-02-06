import { createSlice } from '@reduxjs/toolkit';
import { fetchGetPosts } from 'store/async-actions/getPosts';

export interface IPost {
  author: string;
  authorID: string;
  datePublish: string;
  text: string;
  _id: string;
}
interface IInitialState {
  posts: IPost[];
}
const initialState: IInitialState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: 'Posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchGetPosts.fulfilled, (state, action) => {
      console.log('WE ARE GATED POSTS');
      console.log(action.payload);
      state.posts = action.payload;
    });
    builder.addCase(fetchGetPosts.rejected, (state, action) => {
      console.log('WE ARE REJECTED POSTS', action.payload);
    });
  },
});

export default postsSlice.reducer;
