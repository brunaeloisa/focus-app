interface MenuItemProps {
  name: string;
  icon: string;
  handleClick: () => void;
}

export function MenuItem({ icon, name, handleClick }: MenuItemProps) {
  return (
    <li role="none" className="hover:bg-active hover:text-white">
      <button
        role="menuitem"
        type="button"
        className="block w-full p-2 text-left"
        onClick={handleClick}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <img src={icon} alt="" className="h-8 w-8" />
          <span>{name}</span>
        </div>
      </button>
    </li>
  );
}
