import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setTheme } from '../../../store/slices/systemSlice';
import { THEMES_DATA } from '../../../data/themes';
import { useState } from 'react';
import { Button3D } from '../../ui/Button3D';
import { ThemePreview } from './ThemePreview';

export function Settings() {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.system.theme);
  const [preview, setPreview] = useState(currentTheme);

  return (
    <>
      <ThemePreview theme={preview} />
      <div>Escolha um tema: </div>
      <select value={preview} onChange={(e) => setPreview(e.target.value)}>
        {THEMES_DATA.map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
      <Button3D onClick={() => dispatch(setTheme(preview))}>Aplicar</Button3D>
    </>
  );
}
