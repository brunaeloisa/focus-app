interface ShortcutProps {
  icon: string;
  name: string;
  isSelected: boolean;
  onOpen: () => void;
}

export function Shortcut({ icon, name, onOpen }: ShortcutProps) {
  return (
    <button
      type="button"
      className="flex h-24 w-26 flex-col items-center gap-0.5"
      onClick={onOpen}
    >
      <img src={icon} alt={name} className="w-16" />
      <span className="px-1 py-px text-center leading-tight text-white">
        {name}
      </span>
    </button>
  );
}
