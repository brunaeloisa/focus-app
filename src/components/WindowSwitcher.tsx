import { Button3D } from './Button3D';
import { type Window } from '../types/window.types';

interface WindowSwitcherProps {
  windows: Window[];
  setWindows: React.Dispatch<React.SetStateAction<Window[]>>;
}

export function WindowSwitcher({ windows, setWindows }: WindowSwitcherProps) {
  function toggleWindow(windowId: string) {
    setWindows((prev) => {
      const target = prev.find((win) => win.id === windowId);
      if (!target) return prev;

      const isMinimizing = target.isActive && !target.isMinimized;

      return prev.map((win) => {
        if (win.id === windowId) {
          return {
            ...win,
            isActive: !isMinimizing,
            isMinimized: isMinimizing
          };
        }

        return { ...win, isActive: false };
      });
    });
  }

  return (
    <div className="flex gap-1 overflow-hidden">
      {windows.map((win) => (
        <Button3D
          key={win.id}
          className="w-36 min-w-8 shrink px-2 py-0.5 text-left"
          pressed={win.isActive}
          onClick={() => toggleWindow(win.id)}
        >
          {win.title}
        </Button3D>
      ))}
    </div>
  );
}
