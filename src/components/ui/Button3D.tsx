import type { ComponentProps } from 'react';

interface Button3DProps extends ComponentProps<'button'> {
  pressed?: boolean;
}

export function Button3D({
  pressed,
  children,
  className = '',
  ...props
}: Button3DProps) {
  return (
    <button
      {...(pressed !== undefined && { 'aria-pressed': pressed })}
      className={`group bg-base ${!pressed ? 'out-3d active:in-3d' : 'in-3d'} ${className} disabled:pointer-events-none`}
      {...props}
    >
      <div
        className={`truncate group-disabled:opacity-50 ${!pressed ? 'group-active:translate-px' : 'translate-px'}`}
      >
        {children}
      </div>
    </button>
  );
}
