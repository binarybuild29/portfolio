import { ABOUT_IMAGE } from "../content";
import { useReveal } from "../use-reveal";
import Watermark from "./Watermark";

export default function AboutSection() {
  const textRef = useReveal<HTMLDivElement>();
  const imageRef = useReveal<HTMLDivElement>(0.15);

  return (
    <section id="about" className="relative overflow-hidden bg-[var(--cd-bg)] py-20 sm:py-28">
      <Watermark text="Exclusive" top="55%" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div ref={textRef} className="cd-reveal">
          <p className="flex items-center gap-3 text-xs font-medium tracking-[0.3em] text-[var(--cd-gold)] uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-[var(--cd-gold-soft)]" />
            Our Story
          </p>
          <h2 className="cd-font-display mt-5 max-w-lg text-3xl tracking-tight text-[var(--cd-cream)] sm:text-4xl">
            Baked with intention, since day one.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--cd-cream-muted)]">
            <p>
              Gateau Studio started as a single-oven kitchen with one rule
              that hasn&apos;t changed since: everything is made from
              scratch, in small batches, with ingredients we&apos;d be happy
              to eat ourselves.
            </p>
            <p>
              From single-origin cocoa to seasonal fruit sourced weekly, we
              treat every cake as a small piece of craftsmanship — not a
              product off a line. It&apos;s slower this way, but it&apos;s
              the only way we know how to do it.
            </p>
          </div>
        </div>

        <div
          ref={imageRef}
          className="cd-reveal aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-[var(--cd-border)]"
        >
          <img
            src={ABOUT_IMAGE}
            alt="A baker finishing a cake by hand in the Gateau Studio kitchen"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
