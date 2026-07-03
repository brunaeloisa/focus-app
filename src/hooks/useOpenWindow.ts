import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createWindow, focusWindow } from '../store/slices/windowSlice';
import { useSoundEffect } from './useSoundEffect';

export default function useOpenWindow() {
  const dispatch = useAppDispatch();
  const windows = useAppSelector((state) => state.windows.windows);
  const { play: playOpenSound } = useSoundEffect();

  const openWindow = useCallback(
    (id: string) => {
      const exists = windows.some((w) => w.id === id);

      if (exists) {
        dispatch(focusWindow(id));
        return;
      }

      playOpenSound();

      dispatch(
        createWindow({
          id,
          isMinimized: false,
          isMaximized: false,
          isActive: true
        })
      );
    },
    [dispatch, playOpenSound, windows]
  );

  return openWindow;
}
