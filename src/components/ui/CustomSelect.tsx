interface CustomSelectProps {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: readonly string[];
}

export function CustomSelect({ value, onChange, options }: CustomSelectProps) {
  return (
    <div className="relative flex-1">
      <select
        id="theme-select"
        className="input-field field-3d h-full w-full appearance-none px-2 font-mono"
        value={value}
        onChange={onChange}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0.5 right-0.5 flex aspect-square justify-end"
      >
        <div className="select-btn flex h-full w-6 items-center justify-center pl-0.5 text-xl leading-none">
          &#9662;
        </div>
      </div>
    </div>
  );
}
