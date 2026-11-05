# NOISE / FORM design preview

v0 and Laravel render **the same TSX pages** from `resources/js/pages/`.
The preview only replaces the data provider and navigation mechanism.

| URL | Shared page | Source of props |
| --- | --- | --- |
| `/` | `resources/js/pages/welcome.tsx` | `mock/updates.ts` in v0; HomeController in Laravel |
| `/updates/{slug}` | `resources/js/pages/updates/show.tsx` | `mock/updates.ts` in v0; UpdateController in Laravel |

`mock/main.tsx` injects fixtures and matches the URL for the PHP-free preview.
`mock/inertia.tsx` maps Inertia's Link to a normal anchor for Vite's SPA
fallback, which supports direct URLs, refresh, and back/forward. Laravel
uses actual Inertia navigation instead.

## Commands

- v0 PHP-free preview: `npm run dev:preview`
- Preview build: `npm run build:preview`
- Laravel + Inertia: `npm run dev`
- Laravel build: `npm run build`

Use `vite.preview.config.ts` for v0 and `vite.config.ts` for Laravel.
Do not introduce a second `mock/welcome.tsx`: edit the shared page directly.
Articles in the mock are fictional; Laravel gets them from the database.
