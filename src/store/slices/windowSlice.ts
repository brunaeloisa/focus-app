import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type AppWindow } from '../../types/window.types';

interface WindowState {
  windows: AppWindow[];
}

const initialState: WindowState = {
  windows: []
};

function bringToFront(windows: AppWindow[], id: string) {
  const targetWindow = windows.find((win) => win.id === id);
  if (targetWindow) targetWindow.isMinimized = false;
  windows.forEach((win) => (win.isActive = win.id === id));
}

export const windowSlice = createSlice({
  name: 'windows',
  initialState: initialState,
  reducers: {
    createWindow: (state, action: PayloadAction<AppWindow>) => {
      const newWindow = action.payload;
      const exists = state.windows.some((win) => win.id === newWindow.id);

      if (!exists) state.windows.push(newWindow);

      bringToFront(state.windows, newWindow.id);
    },
    closeWindow: (state, action: PayloadAction<string>) => {
      state.windows = state.windows.filter((win) => win.id !== action.payload);
    },
    focusWindow: (state, action: PayloadAction<string>) => {
      bringToFront(state.windows, action.payload);
    },
    minimizeWindow: (state, action: PayloadAction<string>) => {
      const win = state.windows.find((win) => win.id === action.payload);

      if (win) {
        win.isMinimized = true;
        win.isActive = false;
      }
    },
    toggleWindow: (state, action: PayloadAction<string>) => {
      const target = state.windows.find((win) => win.id === action.payload);
      if (!target) return;

      const isMinimizing = target.isActive && !target.isMinimized;

      target.isMinimized = isMinimizing;
      target.isActive = !isMinimizing;

      state.windows.forEach((win) => {
        if (win.id !== action.payload) win.isActive = false;
      });
    }
  }
});

export const {
  createWindow,
  closeWindow,
  minimizeWindow,
  focusWindow,
  toggleWindow
} = windowSlice.actions;

export default windowSlice.reducer;
