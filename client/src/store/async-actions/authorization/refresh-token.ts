import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from 'http/axios-instance';

export const fetchRefreshToken = createAsyncThunk('refresh-token', async () => {
  $api
    .post('/refresh')
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
});
