import { useEffect, useRef, useState } from 'react';
import { Button3D } from './Button3D';
import { WindowSwitcher } from './WindowSwitcher';

function getCurrentTime() {
  const now = new Date();

  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

const menuItems = ['Ajuda', 'Configurações', 'Suspender'];

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
    <footer className="border-t-highlight bg-base h-taskbar fixed bottom-0 flex w-full items-center justify-between gap-3 border-t-2 px-1 pb-px">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div ref={menuRef}>
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

          {isMenuOpen && (
            <ul
              id="start-menu"
              role="menu"
              className="bg-base out-3d absolute bottom-full left-1 mb-0.5 w-48 p-0.5"
            >
              {menuItems.map((item) => (
                <li role="none" className="hover:bg-active hover:text-white">
                  <button
                    role="menuitem"
                    type="button"
                    className="block w-full px-3 py-2 text-left"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <WindowSwitcher />
      </div>

      <div className="border-midtone border-r-highlight border-b-highlight border-2 px-2 py-0.5">
        {time}
      </div>
    </footer>
  );
}
