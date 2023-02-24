import { createAsyncThunk } from '@reduxjs/toolkit';
import { IResponseErrorBody } from 'http/fetch/fetch-interfaces';
import $api from '../../../http/axios-instance';

interface IData {
  id: string;
  idUser: string;
}

export const fetchIgnorePost = createAsyncThunk<string, IData, { rejectValue: IResponseErrorBody }>(
  'ignore-post',
  async (data, { rejectWithValue }) => {
    return $api
      .put('/ignore-this-post', data)
      .then((response) => response.data._id)
      .catch((err) => rejectWithValue(err.response));
  }
);
