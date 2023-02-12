import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPost } from 'store/slices/interfaces/PostsSliceInterfaces';
import $api from '../../../http/index';

export const fetchGetPosts = createAsyncThunk<
  { posts: IPost[]; length: number },
  { countSkip: number },
  { rejectValue: string }
>('get-posts', async (data, { rejectWithValue }) => {
  return $api
    .post(`/all-posts`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return rejectWithValue(err);
    });
});
