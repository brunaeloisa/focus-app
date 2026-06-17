import { PROGRAMS_DATA } from '../data/programs';

const menuItems = ['Ajuda', 'Configurações', 'Suspender'];

interface StartMenuProps {
  onClose: () => void;
}

export function StartMenu({ onClose }: StartMenuProps) {
  return (
    <ul
      id="start-menu"
      role="menu"
      className="bg-base out-3d before:bg-inactive absolute bottom-full left-0 z-900 mb-0.5 w-56 p-0.5 pl-6 before:absolute before:top-px before:bottom-0.5 before:left-0 before:w-6 before:content-['']"
    >
      {menuItems.map((item) => (
        <li key={item} role="none" className="hover:bg-active hover:text-white">
          <button
            role="menuitem"
            type="button"
            className="block w-full p-2 text-left"
            onClick={onClose}
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <img src={PROGRAMS_DATA.ajuda.icon} alt="" className="w-8.5" />
              <span>{item}</span>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
