import { createAsyncThunk } from '@reduxjs/toolkit';
import { IResponseErrorBody } from 'http/fetch/fetch-interfaces';
import { IPost } from 'store/slices/interfaces/posts-slice-interfaces';
import $api from '../../../http/axios-instance';

interface IData {
  countSkip: number;
  userId: string;
}

interface IResponse {
  length: number;
  posts: IPost[];
}

export const fetchGetPosts = createAsyncThunk<
  IResponse,
  IData,
  { rejectValue: IResponseErrorBody }
>('get-posts', async (data, { rejectWithValue, dispatch }) => {
  return $api
    .post(`/all-posts`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return rejectWithValue(err.response);
    });
});
