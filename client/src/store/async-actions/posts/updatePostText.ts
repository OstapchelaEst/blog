import { createAsyncThunk } from '@reduxjs/toolkit';
import { IResponseErrorBody } from 'http/fetch/fetch-interfaces';
import { IPost } from 'store/slices/interfaces/posts-slice-interfaces';
import $api from '../../../http/axios-instance';

interface IData {
  id: string;
  newText: string;
}

export const fetchUpdatePostText = createAsyncThunk<
  IPost,
  IData,
  { rejectValue: IResponseErrorBody }
>('update-post-text', async (data, { rejectWithValue }) => {
  return $api
    .put('/update-post-text', data)
    .then((respons) => {
      return respons.data;
    })
    .catch((err) => rejectWithValue(err.response));
});
