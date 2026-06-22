import { WindowView } from './WindowView';
import { useAppSelector } from '../../store/hooks';
import type { AppWindow } from '../../types/window.types';
import { Shortcut } from './Shortcut';
import { useState } from 'react';
import { SelectionFilter } from './SelectionFilter';
import { PROGRAMS_DATA } from '../../data/programs';
import useOpenWindow from '../../hooks/useOpenWindow';

const apps = ['help'];

export function Desktop() {
  const windows = useAppSelector((state) => state.windows.windows);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const openWindow = useOpenWindow();

  return (
    <main
      className="bg-wallpaper relative w-screen grow overflow-hidden p-5"
      onClick={() => setSelectedApp(null)}
    >
      <SelectionFilter />

      <div className="flex w-40 flex-col gap-4">
        {apps.map((appId) => {
          const app = PROGRAMS_DATA[appId];

          return (
            <Shortcut
              key={appId}
              icon={app.icon}
              name={app.name}
              isSelected={selectedApp === appId}
              onSelect={(e) => {
                e.stopPropagation();
                setSelectedApp(appId);
              }}
              onOpen={(e) => {
                e.stopPropagation();
                openWindow(appId);
                setSelectedApp(null);
              }}
            />
          );
        })}
      </div>

      {windows.map((win: AppWindow) => (
        <WindowView windowData={win} key={win.id}>
          Conteúdo da Janela.
        </WindowView>
      ))}
    </main>
  );
}
