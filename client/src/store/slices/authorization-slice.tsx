import { createSlice } from '@reduxjs/toolkit';
import { fetchCreateUser } from 'store/async-actions/authorization';

const initialState = {
  refreshToken: '',
};

const AuthorizationSlice = createSlice({
  name: 'Aythorization',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCreateUser.fulfilled, () => {
      console.log('EWRIKA');
    });
    builder.addCase(fetchCreateUser.rejected, () => {
      console.log('NE EWRIKA');
    });
  },
});

export default AuthorizationSlice.reducer;
