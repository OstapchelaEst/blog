import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http/axios-instens';

export const fetchIgnorePost = createAsyncThunk<string, { id: string; idUser: string }>(
  'ignore-post',
  async (data, { rejectWithValue }) => {
    return $api
      .put('/ignore-this-post', data)
      .then((response) => response.data._id)
      .catch((err) => rejectWithValue(err));
  }
);
