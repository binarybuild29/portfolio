import { useState, type FormEvent } from "react";
import { CONTACT_INFO } from "../content";
import { useReveal } from "../use-reveal";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useReveal<HTMLDivElement>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Front-end only demo — no backend wired up.
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <section id="contact" className="bg-[var(--cd-bg-alt)] py-20 sm:py-28">
      <div ref={sectionRef} className="cd-reveal mx-auto max-w-7xl px-5 sm:px-8">
        <p className="flex items-center gap-3 text-xs font-medium tracking-[0.3em] text-[var(--cd-gold)] uppercase">
          <span aria-hidden="true" className="h-px w-8 bg-[var(--cd-gold-soft)]" />
          Order &amp; Contact
        </p>
        <h2 className="cd-font-display mt-5 max-w-xl text-3xl tracking-tight text-[var(--cd-cream)] sm:text-4xl">
          Let&apos;s plan your next cake.
        </h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <form onSubmit={handleSubmit} className="space-y-5">
            {submitted && (
              <div
                role="status"
                aria-live="polite"
                className="rounded-xl border border-[var(--cd-gold-soft)]/50 bg-[var(--cd-gold-soft)]/10 p-4 text-sm text-[var(--cd-gold-strong)]"
              >
                Thanks — we&apos;ll get back to you shortly to confirm your order.
              </div>
            )}

            <div>
              <label htmlFor="cd-name" className="block text-sm font-medium text-[var(--cd-cream)]">
                Name
              </label>
              <input
                id="cd-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your full name"
                className="mt-2 w-full rounded-lg border border-[var(--cd-border)] bg-[var(--cd-surface)] px-4 py-3 text-sm text-[var(--cd-cream)] placeholder:text-[var(--cd-cream-soft)]"
              />
            </div>

            <div>
              <label htmlFor="cd-phone" className="block text-sm font-medium text-[var(--cd-cream)]">
                Phone
              </label>
              <input
                id="cd-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="+91 98765 43210"
                className="mt-2 w-full rounded-lg border border-[var(--cd-border)] bg-[var(--cd-surface)] px-4 py-3 text-sm text-[var(--cd-cream)] placeholder:text-[var(--cd-cream-soft)]"
              />
            </div>

            <div>
              <label htmlFor="cd-message" className="block text-sm font-medium text-[var(--cd-cream)]">
                Message
              </label>
              <textarea
                id="cd-message"
                name="message"
                rows={5}
                required
                placeholder="Tell us about the occasion, flavor, and date you need it by…"
                className="mt-2 w-full rounded-lg border border-[var(--cd-border)] bg-[var(--cd-surface)] px-4 py-3 text-sm text-[var(--cd-cream)] placeholder:text-[var(--cd-cream-soft)]"
              />
            </div>

            <button type="submit" className="cd-btn cd-btn-solid w-full sm:w-auto">
              Send Message
            </button>
          </form>

          <div className="space-y-6">
            <dl className="space-y-5">
              <div>
                <dt className="text-xs font-medium tracking-[0.2em] text-[var(--cd-cream-soft)] uppercase">
                  Phone
                </dt>
                <dd className="mt-2">
                  <a
                    href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                    className="text-base font-medium text-[var(--cd-gold-strong)] hover:text-[var(--cd-gold)]"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium tracking-[0.2em] text-[var(--cd-cream-soft)] uppercase">
                  Email
                </dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-base font-medium text-[var(--cd-gold-strong)] hover:text-[var(--cd-gold)]"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium tracking-[0.2em] text-[var(--cd-cream-soft)] uppercase">
                  Studio
                </dt>
                <dd className="mt-2 text-base text-[var(--cd-cream-muted)]">
                  {CONTACT_INFO.address}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium tracking-[0.2em] text-[var(--cd-cream-soft)] uppercase">
                  Hours
                </dt>
                <dd className="mt-2 text-base text-[var(--cd-cream-muted)]">
                  {CONTACT_INFO.hours}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
