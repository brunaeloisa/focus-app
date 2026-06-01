import { useState } from 'react';
import { Button3D } from './Button3D';

interface Window {
  id: string;
  title: string;
  isMinimized: boolean;
  isActive: boolean;
}

export function WindowSwitcher() {
  const [windows, setWindows] = useState<Window[]>([
    {
      id: 'janela1',
      title: 'Nova Janela 1',
      isMinimized: true,
      isActive: false
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
      isMinimized: false,
      isActive: true
    }
  ]);

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
