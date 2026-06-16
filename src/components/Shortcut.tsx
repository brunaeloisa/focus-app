interface ShortcutProps {
  icon: string;
  name: string;
  isSelected: boolean;
  onOpen: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSelect: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Shortcut({
  icon,
  isSelected,
  name,
  onOpen,
  onSelect
}: ShortcutProps) {
  return (
    <button
      type="button"
      className="flex h-24 w-26 flex-col items-center gap-0.5"
      onClick={onSelect}
      onDoubleClick={onOpen}
    >
      <img
        src={icon}
        alt={name}
        className="block w-16"
        style={{ filter: isSelected ? 'url(#selection-filter)' : 'none' }}
      />

      <span
        className={`px-1 py-px text-center leading-tight text-white ${isSelected ? 'selected-text' : ''}`}
      >
        {name}
      </span>
    </button>
  );
}
