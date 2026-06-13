import { WindowView } from './WindowView';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import type { AppWindow } from '../types/window.types';
import { createWindow } from '../store/slices/windowSlice';
import { Shortcut } from './Shortcut';
import HelpIcon from '../assets/help.svg';

export function Desktop() {
  const windows = useAppSelector((state) => state.windows.windows);
  const dispatch = useAppDispatch();

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
    <main className="bg-wallpaper relative w-screen grow overflow-hidden p-5">
      <div className="flex w-40 flex-col gap-4">
        <Shortcut
          icon={HelpIcon}
          name={'Ajuda'}
          isSelected={false}
          onOpen={() => openWindow('ajuda', 'Ajuda')}
        />

        <Shortcut
          icon={HelpIcon}
          name={'Programa de Exemplo'}
          isSelected={false}
          onOpen={() => openWindow('janela1', 'Programa de Exemplo')}
        />
      </div>

      {windows.map((win: AppWindow) => (
        <WindowView windowData={win} key={win.id}>
          Conteúdo da Janela.
        </WindowView>
      ))}
    </main>
  );
}
