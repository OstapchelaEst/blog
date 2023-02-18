import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http/index';
import { INewPost } from './createPost';

export const fetchUpdatePostText = createAsyncThunk<INewPost, { id: string; newText: string }>(
  'update-post-text',
  async (data) => {
    return $api
      .put('/update-post-text', data)
      .then((respons) => {
        return respons.data;
      })
      .catch((err) => console.log(err));
  }
);
