import { GALLERY_IMAGES } from "../content";
import { useReveal } from "../use-reveal";

export default function GallerySection() {
  const headerRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>(0.1);

  return (
    <section id="gallery" className="bg-[var(--cd-bg-alt)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div ref={headerRef} className="cd-reveal">
          <p className="flex items-center gap-3 text-xs font-medium tracking-[0.3em] text-[var(--cd-gold)] uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-[var(--cd-gold-soft)]" />
            Gallery
          </p>
          <h2 className="cd-font-display mt-5 max-w-xl text-3xl tracking-tight text-[var(--cd-cream)] sm:text-4xl">
            A closer look at the craft.
          </h2>
        </div>

        <div
          ref={gridRef}
          className="cd-reveal mt-10 columns-2 gap-4 sm:columns-3 sm:gap-5 [&>*]:mb-4 sm:[&>*]:mb-5"
        >
          {GALLERY_IMAGES.map((src, index) => (
            <div
              key={src + index}
              className="group overflow-hidden rounded-2xl border border-[var(--cd-border)] break-inside-avoid"
            >
              <img
                src={src}
                alt=""
                aria-hidden={index > 0}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                  index % 3 === 0 ? "aspect-[3/4]" : "aspect-square"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
