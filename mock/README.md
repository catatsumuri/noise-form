# v0 design preview — NOISE / FORM

The original Laravel + Inertia application stays on `main` / `feat/noise-form`.
This branch runs its **actual React page files** through a PHP-free Vite preview.

## Route wiring

| URL | Real page rendered | Mock data |
| --- | --- | --- |
| `/` | `resources/js/pages/welcome.tsx` | Static content in the page |
| `/updates/new-chapter-in-berlin` | `resources/js/pages/updates/show.tsx` | `mock/updates.ts` |
| `/updates/signal-field-enters-the-world` | Same `updates/show.tsx` | `mock/updates.ts` |
| `/updates/the-feeling-of-digital-matter` | Same `updates/show.tsx` | `mock/updates.ts` |

Entry point: `index.html` → `mock/main.tsx`. Vite handles deep links with its SPA fallback.
This mock intentionally uses normal `<a href>` links, so direct navigation, browser back,
and refresh work without a real Laravel server or Inertia router.

## Import into v0

Use `catatsumuri/noise-form`, branch `v0/design`, root `./`, command `vp dev`.
Visit the home page; click any update title to preview the shared article template.
v0 should edit `resources/js/pages/updates/show.tsx` for the article design.

## Migrating to real Inertia routes

1. Add a Laravel route `GET /updates/{slug}` that looks up an article and returns
   `Inertia::render('updates/show', ['article' => $article])` (or the equivalent).
2. Replace home-page native article anchors with Inertia `Link` components.
3. Leave `updates/show.tsx` and its `article` prop intact.
4. Do **not** copy `mock/`, `index.html`, or the preview Vite configuration into Laravel.

This is a static design preview. Article fixtures are fictional, not database content.
