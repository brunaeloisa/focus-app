import { useState } from 'react';
import { TaskBar } from '../components/TaskBar';
import { type Window } from '../types/window.types';
import { WindowView } from '../components/WindowView';

export function Desktop() {
  const [windows, setWindows] = useState<Window[]>([
    {
      id: 'janela1',
      title: 'Nova Janela 1',
      isMinimized: false,
      isActive: true
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
      isMinimized: true,
      isActive: false
    }
  ]);

  return (
    <div className="bg-wallpaper relative h-screen w-screen overflow-hidden">
      <TaskBar windows={windows} setWindows={setWindows} />

      {windows.map((win) => (
        <WindowView windowData={win} setWindows={setWindows} key={win.id}>
          Conteúdo da Janela.
        </WindowView>
      ))}
    </div>
  );
}
