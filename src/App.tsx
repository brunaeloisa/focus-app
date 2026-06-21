import { useEffect } from 'react';
import { Desktop } from './components/Desktop';
import { TaskBar } from './components/TaskBar';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { toggleSuspend } from './store/slices/systemSlice';

function App() {
  const isSuspended = useAppSelector((state) => state.system.isSuspended);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isSuspended) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === 'Space') {
        event.preventDefault();
        dispatch(toggleSuspend());
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSuspended, dispatch]);

  return (
    <>
      <div
        className={`flex h-screen w-screen flex-col overflow-hidden select-none ${isSuspended ? 'pointer-events-none' : ''}`}
      >
        <Desktop />
        <TaskBar />
      </div>

      {isSuspended && (
        <div
          onClick={() => dispatch(toggleSuspend())}
          className="fixed inset-0 z-999999 flex items-center justify-center bg-black"
          aria-hidden="true"
        >
          <div className="px-4 text-center tracking-widest">
            <p className="text-xl text-white uppercase">SISTEMA SUSPENSO</p>
            <p className="mt-6 animate-pulse text-sm text-gray-400 normal-case">
              Clique em qualquer lugar ou pressione ESPAÇO para retornar...
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
