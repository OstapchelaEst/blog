import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPost } from 'store/slices/interfaces/posts-slice-interfaces';
import { loadingSlice } from 'store/slices/loading-slice';
import $api from '../../../http/axios-instens';

const { stopLoading, startLoading } = loadingSlice.actions;

export const fetchGetPosts = createAsyncThunk<
  { length: number; posts: IPost[] },
  { countSkip: number },
  { rejectValue: string }
>('get-posts', async (data, { rejectWithValue, dispatch }) => {
  dispatch(startLoading());
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
