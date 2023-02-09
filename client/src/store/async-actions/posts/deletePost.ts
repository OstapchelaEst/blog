import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http/index';
import { INewPost } from './createPost';

export const fetchDeletePost = createAsyncThunk<INewPost, { id: string }>(
  'delete-post',
  async (data) => {
    return $api
      .delete('/delete-post', { data })
      .then((respons) => respons.data)
      .catch((err) => console.log(err));
  }
);
