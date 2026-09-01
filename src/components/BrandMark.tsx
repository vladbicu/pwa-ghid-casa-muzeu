import React from 'react';

/**
 * "Casa Muzeu Bukowina" identity mark — a cross-stitch rhomb enclosing a house
 * with an open door, drawn on an 11×11 grid of 4-unit cells.
 *
 * - <BrandMark>      full two-colour mark (rhomb + house). Use at 24px and above.
 * - <BrandMarkSmall> the house alone, tight viewBox. Use under 24px / as an icon.
 * - <BrandLockup>    mark + "Casa Muzeu" / "BUKOWINA" wordmark.
 */

// [x, y] of each 3.4×3.4 cell.
const RHOMB: [number, number][] = [
  [0.3, 20.3], [4.3, 16.3], [4.3, 24.3], [8.3, 12.3], [8.3, 28.3],
  [12.3, 8.3], [12.3, 32.3], [16.3, 4.3], [16.3, 36.3], [20.3, 0.3],
  [20.3, 40.3], [24.3, 4.3], [24.3, 36.3], [28.3, 8.3], [28.3, 32.3],
  [32.3, 12.3], [32.3, 28.3], [36.3, 16.3], [36.3, 24.3], [40.3, 20.3],
];

const HOUSE: [number, number][] = [
  [20.3, 12.3],
  [16.3, 16.3], [20.3, 16.3], [24.3, 16.3],
  [12.3, 20.3], [16.3, 20.3], [20.3, 20.3], [24.3, 20.3], [28.3, 20.3],
  [16.3, 24.3], [20.3, 24.3], [24.3, 24.3],
  [16.3, 28.3], [24.3, 28.3],
];

const cells = (list: [number, number][], fill: string) =>
  list.map(([x, y], i) => (
    <rect key={i} x={x} y={y} width="3.4" height="3.4" rx="0.7" fill={fill} />
  ));

interface MarkProps {
  size?: number;
  className?: string;
  title?: string;
}

export function BrandMark({ size = 44, className, title = 'Casa Muzeu Bukowina' }: MarkProps) {
  return (
    <svg
      viewBox="0 0 44 44"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title}
    >
      {cells(RHOMB, 'rgb(var(--museum-walnut))')}
      {cells(HOUSE, 'rgb(var(--museum-brown))')}
    </svg>
  );
}

export function BrandMarkSmall({ size = 20, className, title = 'Casa Muzeu Bukowina' }: MarkProps) {
  return (
    <svg
      viewBox="12 12 19.7 19.7"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title}
    >
      {cells(HOUSE, 'rgb(var(--museum-brown))')}
    </svg>
  );
}

interface LockupProps {
  markSize?: number;
  className?: string;
  onDark?: boolean;
}

export function BrandLockup({ markSize = 26, className, onDark = false }: LockupProps) {
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ''}`}>
      <BrandMark size={markSize} />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-museum-walnut" style={{ fontSize: 16 }}>
          Casa Muzeu
        </span>
        <span
          className={onDark ? 'text-accent-400' : 'text-accent-700'}
          style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: 2 }}
        >
          Bukowina
        </span>
      </span>
    </span>
  );
}
