# Laravel Starter Kit: unchanged welcome.tsx in v0

This is the same workflow used in the previous Inertia + v0 PoC.

The original `resources/js/pages/welcome.tsx` is imported directly from `mock/main.tsx`. It is **not copied or edited**. Vite aliases replace only backend-dependent imports:

- `@inertiajs/react` → `mock/inertia.tsx` (Head, Link, usePage)
- `@erag/lang-sync-inertia/react` → `mock/lang.ts` (English translation identity)
- `@/routes` → `mock/routes.ts` (mock URLs)

The preview shows the unauthenticated English version of the original welcome page. Login and register destinations are placeholders, not live authentication screens.

## v0 preview

Import `catatsumuri/noise-form`, select branch `v0/design`, Root Directory `./`, and run `vp dev` from repository root.

Root `vite.config.ts` is intentionally the PHP-free v0 configuration; original Laravel config is backed up as `vite.laravel.config.ts`.

## Local Laravel

Use `main` or `feat/noise-form` for Laravel at `localhost:8000`. Do **not** merge mock files, `index.html`, or the design-branch Vite config into Laravel.

Only after confirming that the unmodified welcome page renders in v0 should the design iteration begin.
