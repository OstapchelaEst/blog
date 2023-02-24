import { createAsyncThunk } from '@reduxjs/toolkit';
import { IResponseErrorBody } from 'http/fetch/fetch-interfaces';
import { IPost } from 'store/slices/interfaces/posts-slice-interfaces';
import $api from '../../../http/axios-instance';

interface IData {
  id: string;
}

export const fetchDeletePost = createAsyncThunk<IPost, IData, { rejectValue: IResponseErrorBody }>(
  'delete-post',
  async (data, { rejectWithValue }) => {
    return $api
      .delete('/delete-post', { data })
      .then((respons) => respons.data)
      .catch((err) => rejectWithValue(err.response));
  }
);
