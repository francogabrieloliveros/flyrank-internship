import Image from "next/image";

export function ProjectThumb({
  image,
  title,
  dark = false,
}: {
  image: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`rigid-frame relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden ${
        dark ? "bg-ink" : "bg-paper"
      }`}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 500px"
      />

      <span
        aria-hidden="true"
        className="liquid-blob absolute -right-8 -top-8 h-28 w-28 bg-teal/50"
      />

      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-4 rounded-sm border ${
          dark ? "border-mist/10" : "border-ink/10"
        }`}
      />
    </div>
  );
}
