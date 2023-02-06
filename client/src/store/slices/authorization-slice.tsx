import { createSlice } from '@reduxjs/toolkit';
import { fetchAuthorizationUser } from 'store/async-actions/authorization';
import { fetchLogout } from 'store/async-actions/logout';
import { fetchCreateUser } from 'store/async-actions/registration';
import { IState, IUserData } from './interfaces';

const initialState: IState = {
  userData: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('data')!) : null,
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
      console.log('FULLFILED WITH VALUE', action.payload);
      state.userData = action.payload;
      state.isAuth = true;
      saveToken(action.payload);
      saveUser(action.payload);
    });
    builder.addCase(fetchCreateUser.rejected, (state, action) => {
      console.log('REJECTED WITH VALUE', action.payload);
      state.responseErrors = action.payload!.message;
    });

    builder.addCase(fetchAuthorizationUser.fulfilled, (state, action) => {
      console.log('FULFILLED WITH VALUE', action.payload);
      state.userData = action.payload;
      state.isAuth = true;
      saveUser(action.payload);
      saveToken(action.payload);
    });
    builder.addCase(fetchAuthorizationUser.rejected, (state, action) => {
      console.log('REJECTED WITH VALUE', action.payload);
      state.responseErrors = action.payload!.message;
    });

    builder.addCase(fetchLogout.fulfilled, (state) => {
      console.log('SECCESS LOGOUT');
      state.isAuth = false;
      state.userData = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
    });

    builder.addCase(fetchLogout.rejected, () => {
      console.log('INVALID LOGOUT');
    });
  },
});

export default AuthorizationSlice.reducer;
