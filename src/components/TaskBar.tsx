import { useEffect, useState } from 'react';
import { Button3D } from './Button3D';
import { WindowSwitcher } from './WindowSwitcher';

function getCurrentTime() {
  const now = new Date();

  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

export function TaskBar() {
  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    let timeoutId: number;

    const updateClock = () => {
      setTime(getCurrentTime());

      const now = new Date();
      const msUntilNextMinute =
        60000 - (now.getSeconds() * 1000 + now.getMilliseconds());

      timeoutId = setTimeout(updateClock, msUntilNextMinute);
    };

    updateClock();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <footer className="border-t-highlight bg-base h-taskbar fixed bottom-0 flex w-full items-center justify-between gap-3 border-t-2 px-1 pb-px">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Button3D className="px-2.5 py-0.5 font-semibold">Iniciar</Button3D>
        <WindowSwitcher />
      </div>

      <div className="border-midtone border-r-highlight border-b-highlight border-2 px-2 py-0.5">
        {time}
      </div>
    </footer>
  );
}
