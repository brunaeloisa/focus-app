import { useRef, useState } from 'react';
import Draggable, {
  type DraggableData,
  type DraggableEvent
} from 'react-draggable';
import { type AppWindow } from '../../types/window.types';
import { Button3D } from '../ui/Button3D';
import { useAppDispatch } from '../../store/hooks';
import {
  closeWindow,
  focusWindow,
  maximizeWindow,
  minimizeWindow
} from '../../store/slices/windowSlice';
import { PROGRAMS_DATA } from '../../data/programs';

interface WindowViewProps {
  windowData: AppWindow;
}

const renderIcon = (pathData: string, strokeWidth = 1) => (
  <svg
    xmlns="http://w3.org"
    viewBox="0 0 16 16"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth={strokeWidth}
  >
    <path fill="none" d={pathData} />
  </svg>
);

export function WindowView({ windowData }: WindowViewProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const program = PROGRAMS_DATA[windowData.id];
  const ProgramComponent = program.component;

  const [savedPosition, setSavedPosition] = useState({ x: 0, y: 0 });
  const [bounds, setBounds] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  });

  function handleFocus() {
    dispatch(focusWindow(windowData.id));
  }

  function handleStart(_: DraggableEvent, data: DraggableData) {
    if (!data) return;

    handleFocus();

    const parent = data.node.parentElement;
    if (!parent) return;

    const rect = data.node.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();

    setBounds({
      left: parentRect.left - rect.left + data.x,
      right: parentRect.right - rect.right + data.x,
      top: parentRect.top - rect.top + data.y,
      bottom: parentRect.bottom - rect.bottom + data.y
    });
  }

  function handleMinimize(e: React.MouseEvent) {
    e.stopPropagation();
    dispatch(minimizeWindow(windowData.id));
  }

  function handleClose(e: React.MouseEvent) {
    e.stopPropagation();
    dispatch(closeWindow(windowData.id));
  }

  function handleMaximize(e: React.MouseEvent) {
    e.stopPropagation();
    dispatch(maximizeWindow(windowData.id));
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-drag-handle"
      cancel="button"
      bounds={bounds}
      disabled={windowData.isMaximized}
      position={windowData.isMaximized ? { x: 0, y: 0 } : savedPosition}
      positionOffset={
        windowData.isMaximized ? { x: 0, y: 0 } : { x: '-50%', y: '-50%' }
      }
      onStart={handleStart}
      onStop={(_, data) => {
        setSavedPosition({ x: data.x, y: data.y });
      }}
    >
      <div
        className={`out-3d bg-base absolute p-0.5 ${
          windowData.isMaximized
            ? 'top-0 left-0 h-full w-full'
            : 'top-1/2 left-1/2 min-h-32 min-w-64'
        } ${windowData.isMinimized ? 'hidden' : ''}`}
        style={{ zIndex: windowData.z ?? 100 }}
        onClick={handleFocus}
        ref={nodeRef}
      >
        <header
          className={`window-drag-handle ${
            windowData.isActive ? 'bg-active' : 'bg-inactive'
          } flex cursor-default items-center justify-between gap-2 px-0.5 py-1`}
        >
          <div className="ml-0.5 flex items-center gap-1 overflow-hidden">
            <img src={program.icon} alt="" className="h-6 w-6" />
            <span className="truncate font-semibold text-white">
              {program.name}
            </span>
          </div>

          <div className="flex items-center gap-0.5">
            <Button3D
              className="flex h-6 w-6 items-center justify-center"
              title="Minimizar"
              onClick={handleMinimize}
            >
              {renderIcon('M3 12h10M3 13h10')}
            </Button3D>

            <Button3D
              className="flex h-6 w-6 items-center justify-center"
              title={windowData.isMaximized ? 'Restaurar' : 'Maximizar'}
              onClick={handleMaximize}
              disabled={!program.allowFullscreen}
            >
              {renderIcon(
                windowData.isMaximized
                  ? 'M5 3h9M5 4h9M5 5h1M13 5h1M5 6h1M13 6h1M2 7h9M13 7h1M2 8h9M13 8h1M2 9h1M10 9h4M2 10h1M10 10h1M2 11h1M10 11h1M2 12h1M10 12h1M2 13h9'
                  : 'M2 3h12M2 4h12M2 5h12M2 6h1M13 6h1M2 7h1M13 7h1M2 8h1M13 8h1M2 9h1M13 9h1M2 10h1M13 10h1M2 11h1M13 11h1M2 12h1M13 12h1M2 13h12'
              )}
            </Button3D>

            <Button3D
              className="flex h-6 w-6 items-center justify-center"
              title="Fechar"
              onClick={handleClose}
            >
              {renderIcon('M3 3L13 13M13 3L3 13', 1.4)}
            </Button3D>
          </div>
        </header>

        <div className="p-0.5">
          {ProgramComponent ? <ProgramComponent /> : 'Conteúdo da Janela.'}
        </div>
      </div>
    </Draggable>
  );
}
