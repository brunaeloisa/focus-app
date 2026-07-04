import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setTheme } from '../../../store/slices/systemSlice';
import { THEMES_DATA } from '../../../data/themes';
import { useState } from 'react';
import { Button3D } from '../../ui/Button3D';
import { ThemePreview } from './ThemePreview';
import { CustomSelect } from '../../ui/CustomSelect';

export function Settings() {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.system.theme);
  const [preview, setPreview] = useState(currentTheme);

  return (
    <div className="flex flex-col gap-1.5 px-6 py-8">
      <div className="self-center">
        <ThemePreview theme={preview} />
      </div>

      <label htmlFor=" theme-select">Escolha um tema: </label>

      <div className="flex w-full items-stretch gap-2">
        <CustomSelect
          id="theme-select"
          value={preview}
          onChange={(e) => setPreview(e.target.value)}
          options={THEMES_DATA}
        />

        <Button3D
          className="px-2.5 py-px"
          onClick={() => dispatch(setTheme(preview))}
        >
          Aplicar
        </Button3D>
      </div>
    </div>
  );
}
