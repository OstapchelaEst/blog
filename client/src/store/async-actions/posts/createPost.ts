import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPost } from 'store/slices/interfaces/posts-slice-interfaces';
import { RootState } from 'store/types/types';
import $api from '../../../http/index';

export interface INewPost {
  author: string;
  text: string;
  authorID: string;
  _id: string;
  datePublish: string;
}

interface IProps {
  text: string;
}

export const fetchCreatePost = createAsyncThunk<
  IPost,
  IProps,
  {
    rejectValue: string;
    state: RootState;
  }
>('create-post', async (props, { rejectWithValue, getState }) => {
  const state = getState();
  const newPost: Omit<INewPost, '_id' | 'datePublish'> = {
    text: props.text,
    author: state.AuthorizationSlice.userData!.login,
    authorID: state.AuthorizationSlice.userData!.userId,
  };
  return $api
    .post('/create-post', newPost)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      rejectWithValue(err);
    });
});
