import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type AppWindow } from '../../types/window.types';

interface WindowState {
  windows: AppWindow[];
}

const initialState: WindowState = {
  windows: []
};

let nextZIndex = 100;

function bringToFront(windows: AppWindow[], id: string) {
  const targetWindow = windows.find((win) => win.id === id);

  if (targetWindow) {
    targetWindow.isMinimized = false;
    targetWindow.z = nextZIndex;
    nextZIndex++;
  }

  windows.forEach((win) => (win.isActive = win.id === id));
}

function focusNextWindow(windows: AppWindow[]) {
  const openWindows = windows.filter((win) => !win.isMinimized);
  openWindows.sort((a, b) => (b.z ?? 0) - (a.z ?? 0));

  windows.forEach((win) => {
    win.isActive = win.id === openWindows[0]?.id;
  });
}

export const windowSlice = createSlice({
  name: 'windows',
  initialState: initialState,
  reducers: {
    createWindow: (state, action: PayloadAction<AppWindow>) => {
      const newWindow = action.payload;
      state.windows.push(newWindow);
      bringToFront(state.windows, newWindow.id);
    },
    closeWindow: (state, action: PayloadAction<string>) => {
      state.windows = state.windows.filter((win) => win.id !== action.payload);
      focusNextWindow(state.windows);
    },
    focusWindow: (state, action: PayloadAction<string>) => {
      bringToFront(state.windows, action.payload);
    },
    minimizeWindow: (state, action: PayloadAction<string>) => {
      const win = state.windows.find((win) => win.id === action.payload);

      if (win) {
        win.isMinimized = true;
        focusNextWindow(state.windows);
      }
    },
    maximizeWindow: (state, action: PayloadAction<string>) => {
      const win = state.windows.find((win) => win.id === action.payload);

      if (win) {
        win.isMaximized = !win.isMaximized;
        bringToFront(state.windows, action.payload);
      }
    },
    toggleWindow: (state, action: PayloadAction<string>) => {
      const target = state.windows.find((win) => win.id === action.payload);
      if (!target) return;

      const isMinimizing = target.isActive && !target.isMinimized;

      if (isMinimizing) {
        target.isMinimized = true;
        focusNextWindow(state.windows);
      } else {
        bringToFront(state.windows, action.payload);
      }
    }
  }
});

export const {
  createWindow,
  closeWindow,
  minimizeWindow,
  maximizeWindow,
  focusWindow,
  toggleWindow
} = windowSlice.actions;

export default windowSlice.reducer;
