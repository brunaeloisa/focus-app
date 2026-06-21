import { createSlice } from '@reduxjs/toolkit';

interface systemState {
  isSuspended: boolean;
}

const initialState: systemState = {
  isSuspended: false
};

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    toggleSuspend: (state) => {
      state.isSuspended = !state.isSuspended;
    }
  }
});

export const { toggleSuspend } = systemSlice.actions;

export default systemSlice.reducer;
