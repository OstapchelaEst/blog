import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASIC_URL } from 'constants/constants';
import { IAuthUser } from 'pages/registration-page/RegistrationPage';
import { IUserData, IResponseError } from 'store/slices/interfaces/authorization-slice-interfaces';
import { loadingSlice } from 'store/slices/loading-slice';

const { startLoading, stopLoading } = loadingSlice.actions;

export const fetchCreateUser = createAsyncThunk<
  IUserData,
  IAuthUser,
  {
    rejectValue: IResponseError;
  }
>('create-user', async (userData, { rejectWithValue, dispatch }) => {
  dispatch(startLoading());
  return axios
    .post(`${BASIC_URL}/registration`, userData)
    .then((res) => {
      dispatch(stopLoading());
      return res.data;
    })
    .catch((err) => {
      dispatch(stopLoading());
      return rejectWithValue(err.response.data);
    });
});
