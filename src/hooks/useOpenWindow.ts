import { useAppDispatch } from '../store/hooks';
import { createWindow } from '../store/slices/windowSlice';

export default function useOpenWindow() {
  const dispatch = useAppDispatch();

  function openWindow(id: string) {
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
