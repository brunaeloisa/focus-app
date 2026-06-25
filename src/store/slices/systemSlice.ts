import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface systemState {
  theme: string;
  isSuspended: boolean;
}

const initialState: systemState = {
  theme: 'win95',
  isSuspended: false
};

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    toggleSuspend: (state) => {
      state.isSuspended = !state.isSuspended;
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    }
  }
});

export const { toggleSuspend, setTheme } = systemSlice.actions;

export default systemSlice.reducer;
