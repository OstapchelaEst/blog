import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPost } from 'store/slices/interfaces/posts-slice-interfaces';
import { loadingSlice } from 'store/slices/loading-slice';
import $api from '../../../http/index';

const { stopLoading } = loadingSlice.actions;

export const fetchGetPosts = createAsyncThunk<
  { posts: IPost[]; length: number },
  { countSkip: number },
  { rejectValue: string }
>('get-posts', async (data, { rejectWithValue, dispatch }) => {
  return $api
    .post(`/all-posts`, data)
    .then((response) => {
      dispatch(stopLoading());
      return response.data;
    })
    .catch((err) => {
      dispatch(stopLoading());
      return rejectWithValue(err);
    });
});
