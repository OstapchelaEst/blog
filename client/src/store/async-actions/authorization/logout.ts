import { createAsyncThunk } from '@reduxjs/toolkit';
import { IResponseErrorBody } from 'http/fetch/fetch-interfaces';
import { IUserData } from 'store/slices/interfaces/authorization-slice-interfaces';
import $api from '../../../http/axios-instance';

export const fetchLogout = createAsyncThunk<IUserData, void, { rejectValue: IResponseErrorBody }>(
  'authorization-logout',
  async (_, { rejectWithValue }) => {
    return $api
      .delete('logout', { withCredentials: true })
      .then((response) => response.data)
      .catch((err) => rejectWithValue(err.response));
  }
);
