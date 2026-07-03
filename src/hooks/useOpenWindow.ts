import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createWindow } from '../store/slices/windowSlice';
import { useSoundEffect } from './useSoundEffect';

export default function useOpenWindow() {
  const dispatch = useAppDispatch();
  const windows = useAppSelector((state) => state.windows.windows);
  const { play: playOpenSound } = useSoundEffect();

  function openWindow(id: string) {
    const exists = windows.some((w) => w.id === id);
    if (!exists) playOpenSound();

    dispatch(
      createWindow({
        id,
        isMinimized: false,
        isMaximized: false,
        isActive: true
      })
    );
  }

  return openWindow;
}
