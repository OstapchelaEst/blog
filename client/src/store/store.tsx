import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthorizationSlice from './slices/authorization-slice';
import PostsSlice from './slices/posts-slice';

export const rootReducer = combineReducers({ AuthorizationSlice, PostsSlice });

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
