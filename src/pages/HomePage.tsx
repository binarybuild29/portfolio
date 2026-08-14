import Section from "@/components/section";
import Eyebrow from "@/components/eyebrow";
import Hero from "@/components/hero";
import ServiceIcon from "@/components/service-icon";
import {
  SERVICES,
  PROJECTS,
  FAQS,
} from "@/lib/content";

export default function HomePage() {
  return (
    <>
      {/* Hero — permanent outlined wordmark */}
      <Hero />

      {/* Services */}
      <Section id="services" className="scroll-mt-20">
        <Eyebrow>What we do</Eyebrow>
        <h2 className="mt-5 max-w-xl font-display text-3xl tracking-tight sm:text-4xl">
          A focused set of services, done well.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          We don&apos;t try to do everything. We build and maintain
          websites and online stores — that&apos;s it, and we&apos;re
          good at it.
        </p>

        <div className="mt-12 flex flex-col divide-y divide-border border-t border-border">
          {SERVICES.map((service) => (
            <article key={service.slug} className="py-12 sm:py-14">
              <div className="grid gap-8 lg:grid-cols-[auto_1fr_1fr] lg:gap-12">
                <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-background-alt">
                    <ServiceIcon slug={service.slug} className="h-8 w-8" />
                  </div>
                  <span className="font-display text-2xl text-accent-soft sm:text-3xl">
                    {service.index}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl tracking-tight sm:text-3xl">
                    {service.name}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
                    {service.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-medium tracking-[0.2em] text-muted-soft uppercase">
                    What&apos;s included
                  </h4>
                  <ul className="mt-4 space-y-3">
                    {service.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
                      >
                        <svg
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong"
                        >
                          <path
                            d="M4 10.5l3.5 3.5L16 6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>



      {/* Work */}
      <Section id="work" className="scroll-mt-20">
        <Eyebrow>Demo work</Eyebrow>
        <h2 className="mt-5 max-w-xl font-display text-3xl tracking-tight sm:text-4xl">
          A selection of projects we&apos;ve built.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          Representative case studies across websites, online stores, and
          redesigns — shared here to illustrate our approach and range.
        </p>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => {
            const isLive = Boolean(project.url);
            const Wrapper = isLive ? "a" : "div";
            return (
              <li key={project.slug}>
                <article className="group h-full overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-200 hover:border-accent-soft">
                  <Wrapper
                    {...(isLive
                      ? {
                          href: project.url,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          "aria-label": `Visit the live ${project.name} site (opens in a new tab)`,
                        }
                      : {})}
                    className="block"
                  >
                    <div
                      aria-hidden={!isLive}
                      className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-surface-raised to-background-alt"
                    >
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={
                            isLive
                              ? `Screenshot of the ${project.name} website`
                              : ""
                          }
                          loading="lazy"
                          className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <span className="font-display text-5xl text-border-strong transition-colors duration-200 group-hover:text-accent-soft">
                          {project.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="p-6 sm:p-7">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs font-medium tracking-widest text-accent-soft uppercase">
                          {project.category}
                        </p>
                        <p className="text-xs text-muted-soft">{project.year}</p>
                      </div>
                      <h3 className="mt-3 font-display text-xl tracking-tight">
                        {project.name}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {project.summary}
                      </p>
                      {isLive && (
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong transition-colors group-hover:text-accent">
                          Visit site
                          <svg
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                          >
                            <path
                              d="M4 10h12M11 5l5 5-5 5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                  </Wrapper>
                </article>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-xs text-muted-soft">
          Gateau Studio is a live project; the remaining case studies are
          representative work used to illustrate our process and range.
        </p>
      </Section>

      {/* About — 01. Who we are */}
      <Section id="about" tone="alt" className="scroll-mt-20">
        <Eyebrow>About</Eyebrow>
        <p className="mt-3 text-xs font-medium tracking-[0.2em] text-muted-soft uppercase">
          01
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl tracking-tight sm:text-4xl">
          Who we are
        </h2>

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-5 text-base leading-relaxed text-muted">
            <p>
              binary builds exists to give businesses a website or online
              store that actually works — for their customers, and for
              them. A lot of small and mid-sized businesses end up with
              sites that were rushed, outdated, or built without much
              thought for how customers actually use them. That&apos;s
              the gap we&apos;re built to close.
            </p>
            <p>
              Rather than offering a long list of loosely related
              services, we deliberately kept our focus narrow: websites,
              online stores, redesigns, and the ongoing support to keep
              them running well.
            </p>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2">
            {[
              {
                title: "Built with intent",
                description:
                  "Every site starts with your goals, not a template.",
              },
              {
                title: "No unnecessary complexity",
                description:
                  "The simplest solution that does the job well.",
              },
              {
                title: "Clear communication",
                description:
                  "You'll always know what stage your project is at.",
              },
              {
                title: "Built to last",
                description:
                  "Fast, responsive, accessible by default — year one and beyond.",
              },
            ].map((value) => (
              <li
                key={value.title}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <h3 className="font-display text-lg tracking-tight">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {value.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* About — 02. What we believe */}
      <Section tone="base">
        <p className="text-xs font-medium tracking-[0.2em] text-muted-soft uppercase">
          02
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl tracking-tight sm:text-4xl">
          What we believe
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Good work comes from a clear point of view. These are the
          principles that shape how we approach every project — big or
          small.
        </p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {[
            {
              title: "Clarity over cleverness",
              description:
                "A website that's easy to understand is more valuable than one that's impressive. We design for the person using it, not for the portfolio.",
            },
            {
              title: "Fewer things, done properly",
              description:
                "We don't spread ourselves thin. A tight focus means the work we do take on gets our full attention — and it shows.",
            },
            {
              title: "Honest, direct communication",
              description:
                "No jargon, no runaround. We tell you what we think, what we're doing, and why — throughout the whole project.",
            },
          ].map((belief) => (
            <li
              key={belief.title}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <h3 className="font-display text-lg tracking-tight">
                {belief.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {belief.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* About — 03. How we work */}
      <Section tone="alt">
        <p className="text-xs font-medium tracking-[0.2em] text-muted-soft uppercase">
          03
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl tracking-tight sm:text-4xl">
          How we work
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          We follow a clear process — for us and for you. No guessing,
          no scope creep, no surprises about what happens next.
        </p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              index: "01",
              title: "Understand",
              description:
                "We start by understanding your business, your customers, and what the website actually needs to do for you.",
            },
            {
              index: "02",
              title: "Design",
              description:
                "We design around clarity and purpose, not trends — every screen is built to guide someone toward a decision.",
            },
            {
              index: "03",
              title: "Build",
              description:
                "We develop with clean, scalable code so your site performs well and can grow without being rebuilt from scratch.",
            },
            {
              index: "04",
              title: "Launch & Support",
              description:
                "We test, launch, and stay involved — so your website keeps working as your business changes.",
            },
          ].map((step) => (
            <li
              key={step.index}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <span className="font-display text-2xl text-accent-soft">
                {step.index}
              </span>
              <h3 className="mt-3 font-display text-lg tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* About — 04. The people behind BinaryBuilds */}
      <Section tone="base">
        <p className="text-xs font-medium tracking-[0.2em] text-muted-soft uppercase">
          04
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl tracking-tight sm:text-4xl">
          The people behind BinaryBuilds
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          We&apos;re a two-person studio. That means you work directly
          with the people building your site — no account managers, no
          handoffs.
        </p>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {[
            {
              name: "Piyush Vats",
              role: "Design & Frontend",
              bio: "Piyush leads design and frontend development — turning ideas into interfaces that are clear, fast, and easy to use.",
              linkedin: "https://www.linkedin.com/in/piyush-vats74",
              instagram: "",
              initials: "PV",
            },
            {
              name: "Pragya Singh",
              role: "Development & Backend",
              bio: "Pragya handles backend development and architecture — making sure everything that powers your site is solid, secure, and scalable.",
              linkedin: "https://www.linkedin.com/in/pragya-singh2909/",
              instagram: "https://www.instagram.com/pragya_singh226/",
              initials: "PS",
            },
          ].map((person) => (
            <li
              key={person.name}
              className="rounded-2xl border border-border bg-surface p-7"
            >
              <div className="flex items-center gap-5">
                <div
                  aria-hidden="true"
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-surface-raised to-background-alt"
                >
                  <span className="font-display text-lg text-accent-soft">
                    {person.initials}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-lg tracking-tight">
                    {person.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted-soft">
                    {person.role}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${person.name} on LinkedIn`}
                      className="inline-flex items-center gap-1.5 text-xs text-accent-soft transition-colors hover:text-accent"
                    >
                      {/* LinkedIn icon (inline SVG) */}
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-3.5 w-3.5 fill-current"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                    </a>
                    {person.instagram && (
                      <a
                        href={person.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${person.name} on Instagram`}
                        className="inline-flex items-center gap-1.5 text-xs text-accent-soft transition-colors hover:text-accent"
                      >
                        {/* Instagram icon (inline SVG) */}
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          className="h-3.5 w-3.5 fill-current"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                        Instagram
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                {person.bio}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* About — 05. Why choose us */}
      <Section tone="alt">
        <p className="text-xs font-medium tracking-[0.2em] text-muted-soft uppercase">
          05
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl tracking-tight sm:text-4xl">
          Why choose us
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          You get two experienced people, fully focused on your project
          — with no layers in between.
        </p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Direct access",
              description:
                "You talk to the people doing the work — always. No project managers, no back-and-forth.",
            },
            {
              title: "Focused expertise",
              description:
                "We only do websites and online stores. That focus means we're genuinely good at it.",
            },
            {
              title: "No surprises",
              description:
                "Clear timelines, transparent pricing, and honest updates throughout.",
            },
            {
              title: "Built for the long run",
              description:
                "Sites we build are maintainable, performant, and ready to grow with your business.",
            },
          ].map((reason) => (
            <li
              key={reason.title}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <h3 className="font-display text-lg tracking-tight">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {reason.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="scroll-mt-20">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="mt-5 max-w-xl font-display text-3xl tracking-tight sm:text-4xl">
          Questions we hear often.
        </h2>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-border border-t border-b border-border">
          {FAQS.map((faq) => (
            <details key={faq.question} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-foreground sm:text-lg">
                {faq.question}
                <svg
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-accent-soft transition-transform duration-200 group-open:rotate-45"
                >
                  <path
                    d="M10 4v12M4 10h12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </summary>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" tone="alt" className="scroll-mt-20 text-center">
        <Eyebrow center>Contact</Eyebrow>
        <h2 className="mx-auto mt-5 max-w-xl font-display text-3xl tracking-tight text-balance sm:text-4xl">
          Let&apos;s build something.
        </h2>
        <p className="mx-auto mt-6 max-w-sm text-base leading-relaxed text-muted">
          Tell us a bit about your project and we&apos;ll get back to
          you within a couple of business days.
        </p>

        <dl className="mx-auto mt-10 flex max-w-sm flex-col items-center gap-6">
          <div>
            <dt className="text-xs font-medium tracking-[0.2em] text-muted-soft uppercase">
              Email
            </dt>
            <dd className="mt-2">
              <a
                href="mailto:binarybuilds29@gmail.com"
                className="text-base font-medium text-accent-strong transition-colors hover:text-accent"
              >
                binarybuilds29@gmail.com
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium tracking-[0.2em] text-muted-soft uppercase">
              Response time
            </dt>
            <dd className="mt-2 text-base text-foreground">
              Usually within 24–48 hours.
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium tracking-[0.2em] text-muted-soft uppercase">
              Instagram
            </dt>
            <dd className="mt-2">
              <a
                href="https://www.instagram.com/pragya_singh226/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BinaryBuilds on Instagram"
                className="inline-flex items-center gap-2 text-base font-medium text-accent-strong transition-colors hover:text-accent"
              >
                {/* Instagram icon (inline SVG) */}
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5 fill-current"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                @pragya_singh226
              </a>
            </dd>
          </div>
        </dl>
      </Section>
    </>
  );
}
