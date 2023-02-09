import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http/index';

export const fetchLikePost = createAsyncThunk<string, { id: string; idUser: string }>(
  'like-post',
  async (ids) => {
    return $api
      .put('/like-post', ids)
      .then((response) => response.data.whoLikes)
      .catch((err) => alert(err));
  }
);
