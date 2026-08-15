export function ProjectThumb({
  title,
  dark = false,
}: {
  title: string;
  dark?: boolean;
}) {
  const initial = title.trim().charAt(0).toUpperCase();

  return (
    <div
      className={`rigid-frame relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden ${
        dark ? "bg-ink" : "bg-paper"
      }`}
    >
      <span
        aria-hidden="true"
        className="liquid-blob absolute -right-8 -top-8 h-28 w-28 bg-teal/50"
      />
      <span
        aria-hidden="true"
        className={`absolute inset-4 rounded-sm border ${
          dark ? "border-mist/10" : "border-ink/10"
        }`}
      />
      <span
        className={`font-display relative text-6xl ${dark ? "text-mist" : "text-ink"}`}
      >
        {initial}
      </span>
    </div>
  );
}
