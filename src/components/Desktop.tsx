import { WindowView } from './WindowView';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import type { AppWindow } from '../types/window.types';
import { createWindow } from '../store/slices/windowSlice';
import { Shortcut } from './Shortcut';
import HelpIcon from '../assets/help.svg';
import { useState } from 'react';

const apps = [
  { id: 'ajuda', name: 'Ajuda', icon: HelpIcon },
  { id: 'exemplo', name: 'Programa de Exemplo', icon: HelpIcon }
];

export function Desktop() {
  const windows = useAppSelector((state) => state.windows.windows);
  const dispatch = useAppDispatch();
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  function openWindow(id: string, title: string) {
    dispatch(
      createWindow({
        id,
        title,
        isMinimized: false,
        isMaximized: false,
        isActive: true
      })
    );
  }

  return (
    <main
      className="bg-wallpaper relative w-screen grow overflow-hidden p-5"
      onClick={() => setSelectedApp(null)}
    >
      <div className="flex w-40 flex-col gap-4">
        {apps.map((app) => (
          <Shortcut
            key={app.id}
            icon={app.icon}
            name={app.name}
            isSelected={selectedApp === app.id}
            onSelect={(e) => {
              e.stopPropagation();
              setSelectedApp(app.id);
            }}
            onOpen={(e) => {
              e.stopPropagation();
              openWindow(app.id, app.name);
              setSelectedApp(null);
            }}
          />
        ))}
      </div>

      {windows.map((win: AppWindow) => (
        <WindowView windowData={win} key={win.id}>
          Conteúdo da Janela.
        </WindowView>
      ))}
    </main>
  );
}
