import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  /** Applied to the inner content wrapper — use to override padding (e.g. "!pt-0"). */
  className?: string;
  /** Applied to the outer <section> — use for things like text alignment. */
  outerClassName?: string;
  id?: string;
  /** Use for alternating background bands down the page. */
  tone?: "base" | "alt";
};

export default function Section({
  children,
  className = "",
  outerClassName = "",
  id,
  tone = "base",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${tone === "alt" ? "bg-background-alt" : "bg-background"} ${outerClassName}`}
    >
      <div
        className={`mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28 ${className}`}
      >
        {children}
      </div>
    </section>
  );
}
