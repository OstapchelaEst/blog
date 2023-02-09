import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASIC_URL } from 'constants/constants';
import { IAuthUser } from 'pages/registration-page/RegistrationPage';
import { IUserData, IResponseError } from 'store/slices/iterfaces/AuthorizationSliceInterfaces';

export const fetchCreateUser = createAsyncThunk<
  IUserData,
  IAuthUser,
  {
    rejectValue: IResponseError;
  }
>('create-user', async (userData, { rejectWithValue }) => {
  return axios
    .post(`${BASIC_URL}/registration`, userData)

    .then((res) => res.data)
    .catch((err) => rejectWithValue(err.response.data));
});
