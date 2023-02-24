import { createAsyncThunk } from '@reduxjs/toolkit';
import { IResponseErrorBody } from 'http/fetch/fetch-interfaces';
import $api from '../../../http/axios-instance';

interface IData {
  id: string;
  idUser: string;
}

export const fetchLikePost = createAsyncThunk<string[], IData, { rejectValue: IResponseErrorBody }>(
  'like-post',
  async (data) => {
    return $api
      .put('/like-post', data)
      .then((response) => response.data.whoLikes)
      .catch((err) => alert(err.response));
  }
);
