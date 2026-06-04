import { configureStore } from '@reduxjs/toolkit';
import windowReducer from './slices/windowSlice';

export const store = configureStore({
  reducer: { windows: windowReducer }
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
