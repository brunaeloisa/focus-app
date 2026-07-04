export function SelectionFilter() {
  return (
    <svg className="invisible absolute h-0 w-0" aria-hidden="true">
      <defs>
        <filter id="selection-filter">
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
  );
}
