import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../http/index';

export const fetchLogout = createAsyncThunk(
  'authorization-logout',
  async (_, { rejectWithValue }) => {
    return $api
      .delete('logout', { withCredentials: true })
      .then((response) => response.data)
      .catch((err) => rejectWithValue(err.message.err));
  }
);
