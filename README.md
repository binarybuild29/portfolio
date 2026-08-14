# binary builds

Portfolio / marketing site for **binary builds**, a digital studio. Single-page
scrolling site — a glass-panel hero, then Services, Work, Process, About,
FAQ, and Contact as sections on one page.

## Stack

- [Vite](https://vite.dev/) + React + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [React Router](https://reactrouter.com/) (installed for future multi-page use — the site is currently a single route)
- Self-hosted [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via `@fontsource`

## Development

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check + production build
npm run lint      # ESLint (includes eslint-plugin-react-hooks)
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  components/   shared UI: header, footer, hero, contact form, icons, etc.
  pages/        route-level pages (currently just HomePage)
  lib/          content data (nav links, services, projects, FAQ, etc.)
  App.tsx       router + layout shell
  main.tsx      entry point
  index.css     design tokens + global styles (Tailwind v4 @theme)
public/
  favicon.svg   brand mark, used as the site favicon
  robots.txt
  sitemap.xml
```

## Notes

- The contact form validates client-side only — no backend is wired up yet.
  See the comment in `src/components/contact-form.tsx` for where to add a
  real submission handler (e.g. Formspree, Resend, or an API route).
- Work/Projects content is placeholder case studies, clearly labeled as
  representative — swap in real client work when available.
