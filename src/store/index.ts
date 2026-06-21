import { configureStore } from '@reduxjs/toolkit';
import windowReducer from './slices/windowSlice';
import systemReducer from './slices/systemSlice';

export const store = configureStore({
  reducer: { windows: windowReducer, system: systemReducer }
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
