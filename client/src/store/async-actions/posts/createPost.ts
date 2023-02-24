import { createAsyncThunk } from '@reduxjs/toolkit';
import { IResponseErrorBody } from 'http/fetch/fetch-interfaces';
import { IPost } from 'store/slices/interfaces/posts-slice-interfaces';
import { RootState } from 'store/types/types';
import $api from '../../../http/axios-instance';

interface IData {
  text: string;
}

export const fetchCreatePost = createAsyncThunk<
  IPost,
  IData,
  {
    rejectValue: IResponseErrorBody;
    state: RootState;
  }
>('create-post', async (data, { rejectWithValue, getState }) => {
  const state = getState();
  const newPost = {
    text: data.text,
    author: state.AuthorizationSlice.userData!.login,
    authorID: state.AuthorizationSlice.userData!.userId,
  };
  return $api
    .post('/create-post', newPost)
    .then((response) => {
      return response.data;
    })
    .catch((err) => rejectWithValue(err.response));
});
