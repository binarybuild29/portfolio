import { FEATURED_CAKE, HERO_IMAGE } from "../content";
import { useReveal } from "../use-reveal";
import Watermark from "./Watermark";

export default function CakeHero() {
  const featured = FEATURED_CAKE;
  const contentRef = useReveal<HTMLDivElement>();
  const badgeRef = useReveal<HTMLDivElement>(0.25);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[var(--cd-bg)] pt-14 pb-20 sm:pt-20 sm:pb-28"
    >
      <Watermark text="Handcrafted" top="4%" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
        {/* Left: editorial heading */}
        <div ref={contentRef} className="cd-reveal order-2 lg:order-1">
          <p className="flex items-center gap-3 text-xs font-medium tracking-[0.3em] text-[var(--cd-gold)] uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-[var(--cd-gold-soft)]" />
            Artisan Bakery, Est. 2018
          </p>

          <h1 className="cd-font-display mt-6 text-[15vw] leading-[0.95] font-medium tracking-tight text-[var(--cd-cream)] sm:text-6xl lg:text-7xl">
            Cakes.
            <br />
            <span className="text-[var(--cd-gold)] italic">Artistry.</span>
            <br />
            Perfection.
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--cd-cream-muted)]">
            Fresh, handcrafted cakes made in small batches with premium
            ingredients — designed for the moments worth celebrating.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#menu" className="cd-btn cd-btn-solid">
              Explore Collection
            </a>
            <a href="#contact" className="cd-btn cd-btn-outline">
              Start Order
            </a>
          </div>
        </div>

        {/* Right: hero image + Baker's Weekly Pick badge card */}
        <div className="relative order-1 lg:order-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-[var(--cd-border)] bg-[var(--cd-surface)] shadow-2xl shadow-black/40">
            <img
              src={HERO_IMAGE}
              alt="Elegant layered celebration cake, freshly finished"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          {/* Baker's Weekly Pick badge card */}
          <div
            ref={badgeRef}
            className="cd-reveal absolute -bottom-10 -left-4 w-[15.5rem] rounded-2xl border border-[var(--cd-border-strong)] bg-[var(--cd-surface-raised)]/95 p-4 shadow-xl shadow-black/50 backdrop-blur sm:-left-10 sm:w-64 sm:p-5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-medium tracking-[0.2em] text-[var(--cd-gold)] uppercase">
                {featured.badge ?? "Baker's Weekly Pick"}
              </span>
              <span className="text-[10px] text-[var(--cd-cream-soft)]">2026</span>
            </div>
            <div className="mt-3 flex gap-3">
              <img
                src={featured.image}
                alt=""
                aria-hidden="true"
                className="h-14 w-14 shrink-0 rounded-lg object-cover"
              />
              <div>
                <h2 className="cd-font-display text-base leading-tight text-[var(--cd-cream)]">
                  {featured.name}
                </h2>
                <p className="mt-1 text-sm font-medium text-[var(--cd-gold-strong)]">
                  {featured.price}
                </p>
              </div>
            </div>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {featured.flavors.map((flavor) => (
                <li
                  key={flavor}
                  className="rounded-full border border-[var(--cd-border-strong)] px-2.5 py-1 text-[10px] text-[var(--cd-cream-muted)]"
                >
                  {flavor}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
