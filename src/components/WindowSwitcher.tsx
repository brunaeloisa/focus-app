import { Button3D } from './Button3D';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleWindow } from '../store/slices/windowSlice';

export function WindowSwitcher() {
  const windows = useAppSelector((state) => state.windows.windows);
  const dispatch = useAppDispatch();

  function handleToggleWindow(windowId: string) {
    dispatch(toggleWindow(windowId));
  }

  return (
    <div className="flex gap-1 overflow-hidden">
      {windows.map((win) => (
        <Button3D
          key={win.id}
          className="w-36 min-w-8 shrink px-2 py-0.5 text-left"
          pressed={win.isActive}
          onClick={() => handleToggleWindow(win.id)}
        >
          {win.title}
        </Button3D>
      ))}
    </div>
  );
}
