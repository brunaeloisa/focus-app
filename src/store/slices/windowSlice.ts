import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type AppWindow } from '../../types/window.types';

interface WindowState {
  windows: AppWindow[];
}

const initialState: WindowState = {
  windows: [
    {
      id: 'janela1',
      title: 'Nova Janela 1',
      isMinimized: false,
      isActive: true
    },
    {
      id: 'janela2',
      title: 'Nova Janela 2',
      isMinimized: true,
      isActive: false
    },
    {
      id: 'janela3',
      title: 'Nova Janela 3',
      isMinimized: true,
      isActive: false
    }
  ]
};

export const windowSlice = createSlice({
  name: 'windows',
  initialState: initialState,
  reducers: {
    createWindow: (state, action: PayloadAction<AppWindow>) => {
      state.windows.push(action.payload);
    },
    closeWindow: (state, action: PayloadAction<string>) => {
      state.windows = state.windows.filter((win) => win.id !== action.payload);
    },
    focusWindow: (state, action: PayloadAction<string>) => {
      state.windows.forEach(
        (win) => (win.isActive = win.id === action.payload)
      );
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

export const { closeWindow, minimizeWindow, focusWindow, toggleWindow } =
  windowSlice.actions;
export default windowSlice.reducer;
