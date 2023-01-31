import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASIC_URL } from 'constants/constants';

export const fetchCreateUser = createAsyncThunk(
  'create-user',
  async (_, { rejectWithValue, getState }) => {
    return axios
      .post(`${BASIC_URL}/registration`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })

      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
);
