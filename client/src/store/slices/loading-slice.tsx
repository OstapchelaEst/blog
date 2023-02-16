import { createSlice } from '@reduxjs/toolkit';
import { IInitialStateLoading } from './interfaces/loading-slice-interfaces';

const initialState: IInitialStateLoading = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: 'loading-slice',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export default loadingSlice.reducer;
