import { useRef, useState, type PointerEvent } from "react";
import { CAKES } from "../content";
import { useReveal } from "../use-reveal";
import Watermark from "./Watermark";

type Props = {
  onSelectCake: (cakeId: string) => void;
};

export default function CakeSlider({ onSelectCake }: Props) {
  const trackRef = useRef<HTMLUListElement>(null);
  const sectionRef = useReveal<HTMLDivElement>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showHint, setShowHint] = useState(true);

  const dragState = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });

  function handlePointerDown(event: PointerEvent<HTMLUListElement>) {
    const track = trackRef.current;
    if (!track) return;
    dragState.current = {
      isDown: true,
      startX: event.clientX,
      scrollLeft: track.scrollLeft,
      moved: false,
    };
    track.classList.add("cd-dragging");
    setShowHint(false);
  }

  function handlePointerMove(event: PointerEvent<HTMLUListElement>) {
    const track = trackRef.current;
    const state = dragState.current;
    if (!state.isDown || !track) return;
    const delta = event.clientX - state.startX;
    if (Math.abs(delta) > 4) state.moved = true;
    track.scrollLeft = state.scrollLeft - delta;
  }

  function endDrag() {
    const track = trackRef.current;
    dragState.current.isDown = false;
    track?.classList.remove("cd-dragging");
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const ratio = maxScroll > 0 ? track.scrollLeft / maxScroll : 0;
    setProgress(Math.min(1, Math.max(0, ratio)));

    const cardWidth = track.scrollWidth / CAKES.length;
    const index = Math.round(track.scrollLeft / cardWidth);
    setActiveIndex(Math.min(CAKES.length - 1, Math.max(0, index)));
  }

  function handleCardClick(cakeId: string) {
    if (dragState.current.moved) return; // was a drag, not a click
    onSelectCake(cakeId);
  }

  return (
    <section
      id="menu"
      className="relative overflow-hidden bg-[var(--cd-bg-alt)] py-20 sm:py-28"
    >
      <Watermark text="Artisan" top="30%" />

      <div ref={sectionRef} className="cd-reveal relative z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="flex items-center gap-3 text-xs font-medium tracking-[0.3em] text-[var(--cd-gold)] uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-[var(--cd-gold-soft)]" />
            The Collection
          </p>
          <h2 className="cd-font-display mt-5 max-w-xl text-3xl tracking-tight text-[var(--cd-cream)] sm:text-4xl">
            Every cake, hand-finished to order.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--cd-cream-muted)]">
            Drag through our current collection, or select a cake for the full
            tasting notes.
          </p>

          {showHint && (
            <p className="mt-6 flex items-center gap-2 text-xs tracking-wide text-[var(--cd-cream-soft)]">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
                <path
                  d="M8 12h8M8 12l3-3M8 12l3 3M16 12l-3-3M16 12l-3 3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Drag to explore
            </p>
          )}
        </div>

        <ul
          ref={trackRef}
          id="tastings"
          className="cd-slider-track mt-10 flex touch-pan-y gap-5 overflow-x-auto px-5 pb-4 sm:gap-6 sm:px-8"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onScroll={handleScroll}
        >
          {CAKES.map((cake, index) => {
            const isActive = index === activeIndex;
            return (
              <li
                key={cake.id}
                className="shrink-0 scroll-ml-5 snap-start"
                style={{ width: isActive ? "18rem" : "15rem" }}
              >
                <button
                  type="button"
                  onClick={() => handleCardClick(cake.id)}
                  className={`group block w-full overflow-hidden rounded-2xl border text-left transition-[width,border-color] duration-300 ${
                    isActive
                      ? "border-[var(--cd-gold)] bg-[var(--cd-surface-raised)]"
                      : "border-[var(--cd-border)] bg-[var(--cd-surface)]"
                  }`}
                >
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <img
                      src={cake.image}
                      alt={cake.name}
                      draggable={false}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="cd-font-display text-lg text-[var(--cd-cream)]">
                      {cake.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[var(--cd-gold-strong)]">
                      {cake.price}
                    </p>

                    {isActive && (
                      <div className="mt-3 space-y-3">
                        <p className="text-sm leading-relaxed text-[var(--cd-cream-muted)]">
                          {cake.description}
                        </p>
                        <ul className="flex flex-wrap gap-1.5">
                          {cake.flavors.map((flavor) => (
                            <li
                              key={flavor}
                              className="rounded-full border border-[var(--cd-border-strong)] px-2.5 py-1 text-[10px] text-[var(--cd-cream-muted)]"
                            >
                              {flavor}
                            </li>
                          ))}
                        </ul>
                        <span className="cd-btn cd-btn-solid w-full !py-2.5 text-xs">
                          Add to Cart
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Progress counter */}
        <div className="mx-auto mt-4 flex max-w-7xl items-center gap-4 px-5 sm:px-8">
          <span className="text-xs tabular-nums text-[var(--cd-cream-soft)]">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <div className="h-px flex-1 bg-[var(--cd-border)]">
            <div
              className="h-px bg-[var(--cd-gold)] transition-[width]"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <span className="text-xs tabular-nums text-[var(--cd-cream-soft)]">
            {String(CAKES.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
