import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPost } from 'store/slices/interfaces/PostsSliceInterfaces';
import $api from '../../../http/index';

export const fetchGetPosts = createAsyncThunk<IPost[], void, { rejectValue: string }>(
  'get-posts',
  async (_, { rejectWithValue }) => {
    return $api
      .get(`/all-posts`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);
