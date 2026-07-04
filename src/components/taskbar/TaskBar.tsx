import { useEffect, useRef, useState } from 'react';
import { Button3D } from '../ui/Button3D';
import { WindowSwitcher } from './WindowSwitcher';
import { StartMenu } from './StartMenu';
import SoundIcon from '../../assets/sound.svg';
import VolumeControl from './VolumeControl';

function getCurrentTime() {
  const now = new Date();

  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

export function TaskBar() {
  const [time, setTime] = useState(getCurrentTime());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const soundRef = useRef<HTMLDivElement>(null);

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
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (isMenuOpen && menuRef.current && !menuRef.current.contains(target)) {
        setIsMenuOpen(false);
      }

      if (
        isVolumeOpen &&
        soundRef.current &&
        !soundRef.current.contains(target)
      ) {
        setIsVolumeOpen(false);
      }
    };

    if (isMenuOpen || isVolumeOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, isVolumeOpen]);

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

      <div
        ref={soundRef}
        className="border-midtone border-r-highlight border-b-highlight relative flex border-2 py-0.5 pr-1"
      >
        <button
          type="button"
          aria-label="Volume"
          aria-expanded={isVolumeOpen}
          aria-haspopup="dialog"
          aria-controls="volume-popup"
          onClick={() => setIsVolumeOpen(!isVolumeOpen)}
          className="pr-1 pl-1.5"
        >
          <img src={SoundIcon} width={20} aria-hidden="true" />
        </button>

        {isVolumeOpen && <VolumeControl />}

        <div className="w-10 text-center">{time}</div>
      </div>
    </footer>
  );
}
