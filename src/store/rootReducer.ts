import { combineReducers } from '@reduxjs/toolkit';
import windowReducer from './slices/windowSlice';
import systemReducer from './slices/systemSlice';

export const rootReducer = combineReducers({
  windows: windowReducer,
  system: systemReducer
});
