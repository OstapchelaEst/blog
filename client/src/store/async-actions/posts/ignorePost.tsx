import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http/index';

export const fetchIgnorePost = createAsyncThunk<string, { id: string; idUser: string }>(
  'ignore-post',
  async (ids) => {
    return $api
      .put('/ignore-this-post', ids)
      .then((response) => response.data._id)
      .catch((err) => alert(err));
  }
);
