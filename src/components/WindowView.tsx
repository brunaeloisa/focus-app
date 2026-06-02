import { Button3D } from './Button3D';
import { type Window } from '../types/window.types';

interface WindowViewProps {
  windowData: Window;
  setWindows: React.Dispatch<React.SetStateAction<Window[]>>;
  children: React.ReactNode;
}

export function WindowView({
  windowData,
  setWindows,
  children
}: WindowViewProps) {
  if (windowData.isMinimized) return null;

  function handleFocus() {
    setWindows((prev) =>
      prev.map((win) => ({
        ...win,
        isActive: win.id === windowData.id
      }))
    );
  }

  function handleMinimize(e: React.MouseEvent) {
    e.stopPropagation();
    setWindows((prev) =>
      prev.map((win) =>
        win.id === windowData.id
          ? { ...windowData, isMinimized: true, isActive: false }
          : win
      )
    );
  }

  function handleClose(e: React.MouseEvent) {
    e.stopPropagation();
    setWindows((prev) => prev.filter((win) => win.id !== windowData.id));
  }

  return (
    <div
      className={`out-3d bg-base absolute top-1/2 left-1/2 min-h-32 min-w-64 -translate-x-1/2 -translate-y-1/2 p-0.5 ${windowData.isActive ? 'z-20' : 'z-10'}`}
      onClick={handleFocus}
    >
      <header
        className={`${
          windowData.isActive ? 'bg-active' : 'bg-inactive'
        } flex cursor-default items-center justify-between p-1`}
      >
        <div className="ml-0.5 font-semibold text-white">
          {windowData.title}
        </div>

        <div className="flex items-center gap-0.5">
          <Button3D
            className="flex h-6 w-6 items-center justify-center"
            title="Minimizar"
            onClick={handleMinimize}
          >
            &#128469;
          </Button3D>

          <Button3D
            className="flex h-6 w-6 items-center justify-center"
            title="Maximizar"
          >
            &#128470;
          </Button3D>

          <Button3D
            className="flex h-6 w-6 items-center justify-center"
            title="Fechar"
            onClick={handleClose}
          >
            &#10005;
          </Button3D>
        </div>
      </header>

      <div className="p-0.5">{children}</div>
    </div>
  );
}
