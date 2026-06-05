import { WindowView } from './WindowView';
import { useAppSelector } from '../store/hooks';
import type { AppWindow } from '../types/window.types';

export function Desktop() {
  const windows = useAppSelector((state) => state.windows.windows);

  return (
    <main className="bg-wallpaper pb-taskbar relative h-screen w-screen overflow-hidden">
      {windows.map((win: AppWindow) => (
        <WindowView windowData={win} key={win.id}>
          Conteúdo da Janela.
        </WindowView>
      ))}
    </main>
  );
}
