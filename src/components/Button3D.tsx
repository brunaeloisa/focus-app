import type { ComponentProps } from 'react';

type Button3DProps = ComponentProps<'button'>;

export function Button3D({
  children,
  className = '',
  ...props
}: Button3DProps) {
  return (
    <button className={`group out-3d active:in-3d ${className}`} {...props}>
      <div className="group-active:translate-px">{children}</div>
    </button>
  );
}
