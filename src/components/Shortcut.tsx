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
  const filterId = `filter-${name.toLowerCase().replaceAll(' ', '-')}`;

  return (
    <button
      type="button"
      className="flex h-24 w-26 flex-col items-center gap-0.5"
      onClick={onSelect}
      onDoubleClick={onOpen}
    >
      <div className="relative">
        <svg className="invisible absolute h-0 w-0">
          <defs>
            <filter id={filterId}>
              <feFlood
                floodColor="var(--color-active)"
                floodOpacity="0.6"
                result="selectionLayer"
              />

              <feComposite
                in="selectionLayer"
                in2="SourceGraphic"
                operator="in"
                result="mask"
              />

              <feBlend mode="normal" in="mask" in2="SourceGraphic" />
            </filter>
          </defs>
        </svg>

        <img
          src={icon}
          alt={name}
          className="block w-16"
          style={{ filter: isSelected ? `url(#${filterId})` : 'none' }}
        />
      </div>

      <span
        className={`px-1 py-px text-center leading-tight text-white ${isSelected ? 'selected-text' : ''}`}
      >
        {name}
      </span>
    </button>
  );
}
