import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthorizationSlice from './slices/authorization-slice';
import LoadingSlice from './slices/loading-slice';
import PostsSlice from './slices/posts-slice';

export const rootReducer = combineReducers({ AuthorizationSlice, PostsSlice, LoadingSlice });

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
