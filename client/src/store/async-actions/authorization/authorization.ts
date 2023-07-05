import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASIC_URL } from 'constants/constants';
import { IAuthUser } from 'pages/registration-page/RegistrationPage';
import { IUserData, IResponseError } from 'store/slices/interfaces/authorization-slice-interfaces';

export const fetchAuthorizationUser = createAsyncThunk<
  IUserData,
  Omit<IAuthUser, 'login'>,
  {
    rejectValue: IResponseError;
  }
>('authorization-user', async (userData, { rejectWithValue }) => {
  return axios
    .post(`${BASIC_URL}/authorization`, userData)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return rejectWithValue(err.response.data);
    });
});
