import type { ReactNode } from "react";

export default function Eyebrow({
  children,
  center = false,
}: {
  children: ReactNode;
  center?: boolean;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-xs font-medium tracking-[0.25em] text-accent uppercase ${
        center ? "justify-center" : ""
      }`}
    >
      <span aria-hidden="true" className="h-px w-8 bg-accent-soft" />
      {children}
    </p>
  );
}
