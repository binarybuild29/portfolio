import { useEffect, useRef, useState } from "react";
import { CAKES, RATING_LABELS, type Cake, type Rating } from "../content";

type Props = {
  cakeId: string;
  onClose: () => void;
};

export default function CakeDetailView({ cakeId, onClose }: Props) {
  const cake = CAKES.find((c) => c.id === cakeId);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once per mount
  }, []);

  if (!cake) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cd-detail-title"
        className="cd-font-display max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border border-[var(--cd-border-strong)] bg-[var(--cd-bg-alt)] shadow-2xl sm:rounded-3xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-[var(--cd-border)] px-5 py-4 sm:px-8">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="cd-font-sans flex items-center gap-2 text-sm text-[var(--cd-cream-muted)] hover:text-[var(--cd-gold-strong)]"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
              <path
                d="M15 6l-6 6 6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Catalog
          </button>

          <ul className="cd-font-sans hidden gap-2 sm:flex">
            <li className="rounded-full border border-[var(--cd-border-strong)] px-3 py-1 text-[10px] tracking-wide text-[var(--cd-cream-muted)] uppercase">
              {cake.badge ?? "Baker's Choice"}
            </li>
            <li className="rounded-full border border-[var(--cd-border-strong)] px-3 py-1 text-[10px] tracking-wide text-[var(--cd-cream-muted)] uppercase">
              Signature Collection
            </li>
          </ul>
        </div>

        <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: gallery */}
          <div>
            <div className="aspect-square w-full overflow-hidden rounded-2xl border border-[var(--cd-border)] bg-[var(--cd-surface)]">
              <img
                src={cake.gallery[activeImage] ?? cake.image}
                alt={cake.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 flex items-center gap-2">
              {cake.gallery.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`Show image ${index + 1}`}
                  aria-current={index === activeImage}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    index === activeImage
                      ? "bg-[var(--cd-gold)]"
                      : "bg-[var(--cd-border-strong)]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: details */}
          <div className="cd-font-sans">
            <h2
              id="cd-detail-title"
              className="cd-font-display text-3xl text-[var(--cd-cream)]"
            >
              {cake.name}
            </h2>
            <p className="mt-1 text-sm text-[var(--cd-cream-soft)]">{cake.size}</p>
            <p className="mt-3 text-2xl font-medium text-[var(--cd-gold-strong)]">
              {cake.price}
            </p>

            {/* Quantity stepper */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-xs tracking-[0.2em] text-[var(--cd-cream-soft)] uppercase">
                Quantity
              </span>
              <div className="flex items-center overflow-hidden rounded-full border border-[var(--cd-border-strong)]">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-2 text-[var(--cd-cream-muted)] hover:text-[var(--cd-gold-strong)]"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm tabular-nums text-[var(--cd-cream)]">
                  {String(quantity).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3.5 py-2 text-[var(--cd-cream-muted)] hover:text-[var(--cd-gold-strong)]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Rating bars */}
            <dl className="mt-8 space-y-3.5">
              {(Object.keys(RATING_LABELS) as (keyof Rating)[]).map((key) => (
                <div key={key} className="flex items-center justify-between gap-4">
                  <dt className="text-sm text-[var(--cd-cream-muted)]">
                    {RATING_LABELS[key]}
                  </dt>
                  <dd className="flex items-center gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`cd-dot ${i < cake.rating[key] ? "cd-dot-filled" : ""}`}
                      />
                    ))}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Story accordion */}
            <details className="mt-8 border-t border-[var(--cd-border)] pt-5" open>
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-[var(--cd-cream)]">
                Origin &amp; Ingredient Notes
                <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 text-[var(--cd-gold)]">
                  <path
                    d="M10 4v12M4 10h12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--cd-cream-muted)]">
                {cake.story}
              </p>
            </details>

            <button type="button" className="cd-btn cd-btn-solid mt-8 w-full">
              Add to Cart · {cake.price}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export type { Cake };
