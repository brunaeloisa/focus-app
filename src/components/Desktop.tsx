import { WindowView } from './WindowView';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import type { AppWindow } from '../types/window.types';
import { Button3D } from './Button3D';
import { createWindow } from '../store/slices/windowSlice';

export function Desktop() {
  const windows = useAppSelector((state) => state.windows.windows);
  const dispatch = useAppDispatch();

  function openWindow(id: string, title: string) {
    dispatch(
      createWindow({
        id,
        title,
        isMinimized: false,
        isActive: true
      })
    );
  }

  return (
    <main className="bg-wallpaper pb-taskbar relative h-screen w-screen overflow-hidden p-5">
      <div className="flex w-40 flex-col gap-3">
        <Button3D onClick={() => openWindow('janela1', 'Nova Janela 1')}>
          Abrir Janela 1
        </Button3D>
        <Button3D onClick={() => openWindow('janela2', 'Nova Janela 2')}>
          Abrir Janela 2
        </Button3D>
        <Button3D onClick={() => openWindow('janela3', 'Nova Janela 3')}>
          Abrir Janela 3
        </Button3D>
      </div>

      {windows.map((win: AppWindow) => (
        <WindowView windowData={win} key={win.id}>
          Conteúdo da Janela.
        </WindowView>
      ))}
    </main>
  );
}
