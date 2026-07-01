import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface systemState {
  theme: string;
  audio: { volume: number; isMuted: boolean };
  isSuspended: boolean;
}

const initialState: systemState = {
  theme: 'win95',
  audio: { volume: 50, isMuted: false },
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
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.audio.volume = action.payload;
    },
    toggleMute: (state) => {
      state.audio.isMuted = !state.audio.isMuted;
    }
  }
});

export const { toggleSuspend, setTheme, setVolume, toggleMute } =
  systemSlice.actions;

export default systemSlice.reducer;
