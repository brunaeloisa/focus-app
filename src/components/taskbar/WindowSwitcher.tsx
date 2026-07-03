import { Button3D } from '../ui/Button3D';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleWindow } from '../../store/slices/windowSlice';
import { PROGRAMS_DATA } from '../../data/programs';

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
          className="w-48 min-w-8 shrink px-1 py-0.5 text-left"
          pressed={win.isActive}
          aria-pressed={win.isActive}
          onClick={() => handleToggleWindow(win.id)}
        >
          <div className="flex w-full items-center gap-1 overflow-hidden">
            <img src={PROGRAMS_DATA[win.id].icon} alt="" className="h-5 w-5" />
            <span className="truncate">{PROGRAMS_DATA[win.id].name}</span>
          </div>
        </Button3D>
      ))}
    </div>
  );
}
