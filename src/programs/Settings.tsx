import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setTheme } from '../store/slices/systemSlice';
import { THEMES_DATA } from '../data/themes';

export function Settings() {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.system.theme);

  return (
    <>
      <div>Escolha um tema: </div>
      <select
        value={currentTheme}
        onChange={(e) => dispatch(setTheme(e.target.value))}
      >
        {THEMES_DATA.map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </>
  );
}
