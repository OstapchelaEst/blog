import { createSlice } from '@reduxjs/toolkit';
import { fetchAuthorizationUser } from 'store/async-actions/authorization/authorization';
import { fetchLogout } from 'store/async-actions/authorization/logout';
import { fetchCreateUser } from 'store/async-actions/authorization/registration';
import { IInitialStateAuthorization, IUserData } from './iterfaces/AuthorizationSliceInterfaces';

const initialState: IInitialStateAuthorization = {
  userData: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')!) : null,
  isAuth: localStorage.getItem('token') ? true : false,
  responseErrors: '',
};

const saveToken = (data: IUserData) => {
  localStorage.setItem('token', data.accessToken);
};
const saveUser = (data: IUserData) => {
  localStorage.setItem('userData', JSON.stringify(data));
};

export const AuthorizationSlice = createSlice({
  name: 'Aythorization',
  initialState,
  reducers: {
    resetResponseError: (state) => {
      state.responseErrors = '';
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchCreateUser.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.isAuth = true;
      saveToken(action.payload);
      saveUser(action.payload);
    });
    builder.addCase(fetchCreateUser.rejected, (state, action) => {
      state.responseErrors = action.payload!.message;
    });

    builder.addCase(fetchAuthorizationUser.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.isAuth = true;
      saveUser(action.payload);
      saveToken(action.payload);
    });
    builder.addCase(fetchAuthorizationUser.rejected, (state, action) => {
      state.responseErrors = action.payload!.message;
    });

    builder.addCase(fetchLogout.fulfilled, (state) => {
      state.isAuth = false;
      state.userData = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
    });

    builder.addCase(fetchLogout.rejected, (state, action) => {
      state.isAuth = false;
      state.userData = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
    });
  },
});

export default AuthorizationSlice.reducer;
