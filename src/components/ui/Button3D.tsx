import type { ComponentProps } from 'react';

interface Button3DProps extends ComponentProps<'button'> {
  pressed?: boolean;
}

export function Button3D({
  pressed,
  children,
  className = '',
  onClick,
  ...props
}: Button3DProps) {
  return (
    <button
      className={`group bg-base ${!pressed ? 'out-3d active:in-3d' : 'in-3d'} ${className} disabled:pointer-events-none`}
      {...props}
      onClick={onClick}
    >
      <div
        className={`truncate group-disabled:opacity-50 ${!pressed ? 'group-active:translate-px' : 'translate-px'}`}
      >
        {children}
      </div>
    </button>
  );
}
