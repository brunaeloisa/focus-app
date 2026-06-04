import { TaskBar } from '../components/TaskBar';
import { WindowView } from '../components/WindowView';
import { useAppSelector } from '../store/hooks';
import type { Window } from '../types/window.types';

export function Desktop() {
  const windows = useAppSelector((state) => state.windows.windows);

  return (
    <div className="bg-wallpaper relative h-screen w-screen overflow-hidden">
      <TaskBar />

      {windows.map((win: Window) => (
        <WindowView windowData={win} key={win.id}>
          Conteúdo da Janela.
        </WindowView>
      ))}
    </div>
  );
}
