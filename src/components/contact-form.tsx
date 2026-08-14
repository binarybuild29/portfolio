import { useRef, useState, type FormEvent } from "react";

type Status = "idle" | "success";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const PROJECT_TYPES = [
  "Website",
  "E-commerce",
  "Website Redesign",
  "Maintenance & Growth",
  "Not sure yet",
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Enter your name.";
    if (!email) {
      nextErrors.email = "Enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!message) nextErrors.message = "Tell us a little about your project.";

    setErrors(nextErrors);

    const errorKeys = Object.keys(nextErrors) as (keyof Errors)[];
    if (errorKeys.length > 0) {
      // Multi-error: focus the summary. Single error: focus the field directly.
      requestAnimationFrame(() => {
        if (errorKeys.length > 1) {
          errorSummaryRef.current?.focus();
        } else {
          formRef.current
            ?.querySelector<HTMLInputElement | HTMLTextAreaElement>(
              `#field-${errorKeys[0]}`
            )
            ?.focus();
        }
      });
      return;
    }

    // Front-end only: no backend is wired up yet. Swap this block for a
    // real submission (e.g. Formspree, Resend, an API route) when ready.
    setStatus("success");
    form.reset();
  }

  const errorEntries = Object.entries(errors) as [
    keyof Errors,
    string,
  ][];

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} className="space-y-6">
      {errorEntries.length > 1 && (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-red-400/40 bg-red-500/10 p-4"
        >
          <p className="text-sm font-medium text-red-200">
            Please fix the following before submitting:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            {errorEntries.map(([field, msg]) => (
              <li key={field} className="text-sm text-red-200">
                <a href={`#field-${field}`} className="underline underline-offset-2">
                  {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {status === "success" && (
        <div
          role="status"
          aria-live="polite"
          className="rounded-xl border border-accent-soft/50 bg-accent-soft/10 p-4 text-sm text-accent-strong"
        >
          Thanks — your message has been received. We&apos;ll get back to
          you soon.
        </div>
      )}

      <div>
        <label
          htmlFor="field-name"
          className="block text-sm font-medium text-foreground"
        >
          Name
        </label>
        <input
          id="field-name"
          name="name"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "field-name-error" : undefined}
          className={`mt-2 w-full rounded-lg border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-soft ${
            errors.name ? "border-red-400/60" : "border-border"
          }`}
          placeholder="Jordan Lee"
        />
        {errors.name && (
          <p id="field-name-error" className="mt-2 text-sm text-red-300">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="field-email"
          className="block text-sm font-medium text-foreground"
        >
          Email
        </label>
        <input
          id="field-email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "field-email-error" : undefined}
          className={`mt-2 w-full rounded-lg border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-soft ${
            errors.email ? "border-red-400/60" : "border-border"
          }`}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p id="field-email-error" className="mt-2 text-sm text-red-300">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="field-project-type"
          className="block text-sm font-medium text-foreground"
        >
          Project type
        </label>
        <select
          id="field-project-type"
          name="projectType"
          defaultValue={PROJECT_TYPES[0]}
          className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground"
        >
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="field-message"
          className="block text-sm font-medium text-foreground"
        >
          Project details
        </label>
        <textarea
          id="field-message"
          name="message"
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "field-message-error" : undefined}
          className={`mt-2 w-full rounded-lg border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-soft ${
            errors.message ? "border-red-400/60" : "border-border"
          }`}
          placeholder="Tell us a bit about what you're looking to build…"
        />
        {errors.message && (
          <p id="field-message-error" className="mt-2 text-sm text-red-300">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-contrast transition-transform duration-200 hover:scale-[1.01] sm:w-auto"
      >
        Send message
      </button>
    </form>
  );
}
