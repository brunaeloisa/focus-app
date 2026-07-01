import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setVolume, toggleMute } from '../../store/slices/systemSlice';

export default function VolumeControl() {
  const { volume, isMuted } = useAppSelector((state) => state.system.audio);
  const dispatch = useAppDispatch();

  return (
    <div
      id="volume-popup"
      role="dialog"
      aria-label="Controle de Volume"
      className="bg-base out-3d absolute right-0 bottom-full z-999 mb-2 flex w-19 flex-col items-center gap-3 p-2"
    >
      <span className="text-left select-none">Volume</span>

      <input
        value={volume}
        onChange={(e) => dispatch(setVolume(Number(e.target.value)))}
        disabled={isMuted}
        type="range"
        min="0"
        max="100"
        className="custom-slider h-28 rotate-180 appearance-none disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Ajustar volume"
      />

      <div className="flex items-center gap-1.5 p-1">
        <input
          checked={isMuted}
          onChange={() => dispatch(toggleMute())}
          type="checkbox"
          id="mute-checkbox"
          className="field-3d text-window-text relative flex h-4.5 w-4.5 appearance-none items-center justify-center text-xs font-extrabold checked:before:content-['✓']"
        />

        <label
          htmlFor="mute-checkbox"
          className="mt-px flex items-center gap-1 text-sm select-none"
        >
          Mudo
        </label>
      </div>
    </div>
  );
}
