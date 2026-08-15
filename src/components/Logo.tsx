export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#EEEEEE" />
      <circle cx="14" cy="14" r="8" fill="#72C3D2" />
      <text
        x="20"
        y="27"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="19"
        fill="#000000"
      >
        F
      </text>
    </svg>
  );
}
