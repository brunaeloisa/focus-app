import { useEffect, useRef, useState } from 'react';
import { Button3D } from './Button3D';
import { WindowSwitcher } from './WindowSwitcher';
import { StartMenu } from './StartMenu';

function getCurrentTime() {
  const now = new Date();

  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

export function TaskBar() {
  const [time, setTime] = useState(getCurrentTime());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutsideMenu = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutsideMenu);
    }

    return () =>
      document.removeEventListener('mousedown', handleClickOutsideMenu);
  }, [isMenuOpen]);

  return (
    <footer className="border-t-highlight bg-base h-taskbar flex w-full shrink-0 items-center justify-between gap-3 border-t-2 px-1 pb-px">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div ref={menuRef} className="relative flex items-center">
          <Button3D
            pressed={isMenuOpen}
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
            aria-controls="start-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="px-2.5 py-0.5 font-semibold"
          >
            Iniciar
          </Button3D>

          {isMenuOpen && <StartMenu onClose={() => setIsMenuOpen(false)} />}
        </div>

        <WindowSwitcher />
      </div>

      <div className="border-midtone border-r-highlight border-b-highlight border-2 px-2 py-0.5">
        {time}
      </div>
    </footer>
  );
}
