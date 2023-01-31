import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthorizationSlice from './slices/authorization-slice';

export const rootReducer = combineReducers({ AuthorizationSlice });

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
