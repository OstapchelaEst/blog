import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http/axios-instens';

export const fetchLikePost = createAsyncThunk<string[], { id: string; idUser: string }>(
  'like-post',
  async (data) => {
    return $api
      .put('/like-post', data)
      .then((response) => response.data.whoLikes)
      .catch((err) => alert(err));
  }
);
