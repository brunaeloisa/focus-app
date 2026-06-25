import { PROGRAMS_DATA } from '../../data/programs';
import { MenuItem } from './MenuItem';
import SuspendIcon from '../../assets/suspend.svg';
import useOpenWindow from '../../hooks/useOpenWindow';
import { useAppDispatch } from '../../store/hooks';
import { toggleSuspend } from '../../store/slices/systemSlice';

const menuItems = ['help', 'settings'];

interface StartMenuProps {
  onClose: () => void;
}

export function StartMenu({ onClose }: StartMenuProps) {
  const openWindow = useOpenWindow();
  const dispatch = useAppDispatch();

  return (
    <ul
      id="start-menu"
      role="menu"
      className="bg-base out-3d before:bg-inactive absolute bottom-full left-0 z-900 mb-0.5 w-56 p-0.5 pl-6 before:absolute before:top-px before:bottom-0.5 before:left-0 before:w-6 before:content-['']"
    >
      {menuItems.map((itemId) => (
        <MenuItem
          key={itemId}
          name={PROGRAMS_DATA[itemId].name}
          icon={PROGRAMS_DATA[itemId].icon}
          handleClick={() => {
            openWindow(itemId);
            onClose();
          }}
        />
      ))}

      <li
        role="separator"
        className="border-b-highlight border-t-midtone border-t border-b"
      />

      <MenuItem
        name={'Suspender'}
        icon={SuspendIcon}
        handleClick={() => {
          onClose();
          dispatch(toggleSuspend());
        }}
      />
    </ul>
  );
}
