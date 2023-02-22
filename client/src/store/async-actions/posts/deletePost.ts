import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http/axios-instens';
import { INewPost } from './createPost';

export const fetchDeletePost = createAsyncThunk<INewPost, { id: string }>(
  'delete-post',
  async (data, { rejectWithValue }) => {
    return $api
      .delete('/delete-post', {})
      .then((respons) => respons.data)
      .catch((err) => rejectWithValue(err));
  }
);
