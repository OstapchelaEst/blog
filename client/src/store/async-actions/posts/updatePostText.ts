import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http/axios-instens';
import { INewPost } from './createPost';

export const fetchUpdatePostText = createAsyncThunk<INewPost, { id: string; newText: string }>(
  'update-post-text',
  async (data, { rejectWithValue }) => {
    return $api
      .put('/update-post-text', data)
      .then((respons) => {
        return respons.data;
      })
      .catch((err) => rejectWithValue(err));
  }
);
