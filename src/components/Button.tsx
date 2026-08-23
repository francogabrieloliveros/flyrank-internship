import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "glass";
  icon?: ReactNode;
  external?: boolean;
  className?: string;
};

const variants = {
  solid: "bg-ink text-mist hover:scale-[1.03]",
  outline: "border border-ink text-ink hover:bg-ink hover:text-mist",
  glass: "glass text-ink hover:scale-[1.03]",
};

export function Button({
  href,
  children,
  variant = "solid",
  icon,
  external,
  className = "",
}: ButtonProps) {
  const classes = `inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm transition-all duration-200 ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
        {icon}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {icon}
    </Link>
  );
}
