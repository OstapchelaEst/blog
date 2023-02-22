import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http/axios-instens';

export const fetchLogout = createAsyncThunk(
  'authorization-logout',
  async (_, { rejectWithValue }) => {
    return $api
      .delete('logout', { withCredentials: true })
      .then((response) => response.data)
      .catch((err) => rejectWithValue(err));
  }
);
