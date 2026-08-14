import { TESTIMONIALS } from "../content";
import { useReveal } from "../use-reveal";
import Watermark from "./Watermark";

export default function TestimonialsSection() {
  const headerRef = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-[var(--cd-bg)] py-20 sm:py-28">
      <Watermark text="Beloved" top="20%" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div ref={headerRef} className="cd-reveal text-center">
          <p className="flex items-center justify-center gap-3 text-xs font-medium tracking-[0.3em] text-[var(--cd-gold)] uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-[var(--cd-gold-soft)]" />
            Testimonials
            <span aria-hidden="true" className="h-px w-8 bg-[var(--cd-gold-soft)]" />
          </p>
          <h2 className="cd-font-display mx-auto mt-5 max-w-xl text-3xl tracking-tight text-[var(--cd-cream)] sm:text-4xl">
            What our customers say.
          </h2>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              name={testimonial.name}
              role={testimonial.role}
              quote={testimonial.quote}
              delay={index * 0.1}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function TestimonialCard({
  name,
  role,
  quote,
  delay,
}: {
  name: string;
  role?: string;
  quote: string;
  delay: number;
}) {
  const cardRef = useReveal<HTMLLIElement>(delay);

  return (
    <li
      ref={cardRef}
      className="cd-reveal rounded-2xl border border-[var(--cd-border)] bg-[var(--cd-surface)] p-7"
    >
      <svg viewBox="0 0 32 24" aria-hidden="true" className="h-6 w-6 text-[var(--cd-gold)]">
        <path
          fill="currentColor"
          d="M0 24V14.4Q0 8.4 3.2 4.6 6.4.8 12 0v4.4Q8.8 5.2 7 7.4 5.2 9.6 5.2 12.4H12V24H0Zm18 0V14.4Q18 8.4 21.2 4.6 24.4.8 30 0v4.4Q26.8 5.2 25 7.4 23.2 9.6 23.2 12.4H30V24H18Z"
        />
      </svg>
      <p className="mt-4 text-sm leading-relaxed text-[var(--cd-cream-muted)]">
        &ldquo;{quote}&rdquo;
      </p>
      <p className="mt-5 text-sm font-medium text-[var(--cd-cream)]">{name}</p>
      {role && <p className="mt-0.5 text-xs text-[var(--cd-cream-soft)]">{role}</p>}
    </li>
  );
}
