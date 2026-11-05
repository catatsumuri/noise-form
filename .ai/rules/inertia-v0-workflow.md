---
paths:
    - 'index.html'
    - 'resources/js/app.tsx'
    - 'resources/js/layouts/**'
    - 'resources/js/pages/auth/**'
    - 'resources/js/pages/dashboard.tsx'
    - 'resources/js/pages/settings/**'
    - 'resources/js/pages/welcome.tsx'
    - 'resources/js/pages/updates/**'
    - 'mock/**'
    - 'vite.preview.config.ts'
    - 'vite.config.ts'
    - 'vite.laravel.config.ts'
    - 'routes/web.php'
    - 'app/Http/Controllers/HomeController.php'
    - 'app/Http/Controllers/UpdateController.php'
    - 'app/Http/Controllers/InquiryController.php'
---

# NOISE / FORM — v0 + Laravel/Inertia workflow

## Non-negotiable: one React UI source

- The **real Laravel/Inertia pages** under `resources/js/pages/` are the only source of UI markup. In particular, edit `resources/js/pages/welcome.tsx` for the landing page and `resources/js/pages/updates/show.tsx` for article details.
- The PHP-free v0 preview MUST import and render those exact components. Never create or reintroduce `mock/welcome.tsx`, duplicated page JSX, or a separate Next.js page.
- v0 is used as a visual design/editor workflow for existing Inertia React components, **not** to migrate the app to Next.js.
- If a feature cannot be previewed, extend the mock data/provider or the thin mock API adapter; do not fork the UI implementation.

## Separate real data/actions from preview fixtures

- In **Laravel**, controllers/routes/database are authoritative. `HomeController` supplies `updates`, `UpdateController` supplies `article`, and `InquiryController` validates and persists inquiry submissions. Public pages receive these as Inertia props.
- In **v0**, `mock/main.tsx` provides fixture `updates` / `article` props from `mock/updates.ts` to the same page components. `mock/inertia.tsx` provides minimal preview-only replacements for Inertia `Link`, `Form`, etc.
- Never import mock fixtures into production page components or Laravel code. Never give the mock permission to persist a real inquiry; show a preview-only response instead.
- Keep real application routes, field names, prop types and preview routes aligned (e.g. `/`, `/updates/{slug}`, `/inquiries`). Add new fixtures/Mock handling when new Props or Inertia UI components are introduced.
- Prefer real Inertia `Link` / `Form` in production TSX. A mock replacement may render a standard anchor or intercept a form submission; it must not become a production dependency.

## Preview responsibilities and supported pages

- Root `index.html` is the PHP-free preview entry point and loads `mock/main.tsx`. Laravel uses its Blade/Inertia entry point; it does not consume this HTML file.
- `mock/main.tsx` explicitly selects a page by URL and supplies its fixture props. Laravel routes and controller props are not automatically synchronized with it. Currently only `/` and fixture-backed `/updates/{slug}` pages are supported; other URLs render the preview 404. Login, registration, and dashboard previews are not implemented yet.
- `mock/routes.ts` supplies replacements for imported Wayfinder route helpers. Returning a URL from a helper does not make that page available in the preview. Keep URL helpers and page resolution conceptually separate, even if reorganizing their files.
- `mock/updates.ts` supplies article fixtures, not API/DB results. `previewUpdates` derives summary props from those fixtures; article detail uses the full fixture including paragraphs.
- `mock/lang.ts` returns translation keys unchanged. English-key rendering is sufficient for this design preview; do not recreate the Laravel translation pipeline here.
- `mock/inertia.tsx` implements only the Inertia API surface needed by supported preview pages. Currently `Link` uses normal anchors, `Form` blocks persistence and displays a preview message, `Head` updates the document title, and `usePage()` returns fixed guest props. These are substitutes, not full Inertia implementations.
- Add a page to the preview only when it is needed for design work. Import the real page, add URL resolution and representative typed props, and extend adapters only for the APIs that page and its layout actually use. A Laravel page does not require a preview counterpart merely because it exists.
- Unsupported URLs must remain explicit 404s. Do not silently render the home page or imply that an unimplemented login, save, or logout action succeeded.

## Authentication props and layout composition

- A future authenticated preview (such as `/dashboard`) should supply a fictional user and the shared props consumed by the page, layout, and navigation. Inspect the actual shared-prop types and consumers, including URL/sidebar state where needed; do not recreate a real Laravel session or require real credentials.
- Guest and authenticated preview states must be explicit and consistent across the page and `usePage()`. The current fixed guest stub is insufficient for authenticated layouts. Add a preview provider/context or equivalent when multiple states are needed, rather than changing all pages to a global fake logged-in user.
- Follow layout selection in `resources/js/app.tsx`: public `welcome` and `updates/*` pages have no app layout; `auth/*` uses `AuthLayout`; `settings/*` uses `AppLayout` outside `SettingsLayout`; other app pages use `AppLayout`.
- `AppLayout` currently selects the sidebar layout. The header layout is an alternative app shell, not another layer to stack on the sidebar shell. Nest page-specific layouts where production does, and apply each layout once.
- Reuse the actual layouts and supply the providers/adapters they need. Do not reproduce a sidebar/header inside mock page markup or alter production layout selection just to make a preview render. Importing `resources/js/app.tsx` directly is not a preview solution: it bootstraps the real Inertia application.
- When adding preview support, verify direct navigation, refresh, links/back navigation, expected props, layout nesting, and mock form behavior. Real authentication, authorization, validation, and persistence still require Laravel checks.

## Build and branch boundaries

- `v0/design` is the design/preview branch; `main` is the Laravel integration branch. Commit design/preview changes on `v0/design`, verify them, then merge `v0/design` into `main`.
- `npm run dev:preview` and `npm run build:preview` use `vite.preview.config.ts` for a PHP-free v0 preview. `npm run dev` and `npm run build` use the Laravel Vite configuration in `vite.config.ts`.
- Both branches retain `mock/`, root `index.html`, and `vite.preview.config.ts` for the shared-page preview. Do not change the default Vite config to preview-only behavior; Laravel builds must continue to use the Laravel entry point.
- When merging `v0/design` into `main`, preserve Laravel controller/model/route/migration changes and keep the shared page components, assets, types, and preview adapters aligned.
- If v0 creates a new branch, compare and intentionally merge its UI changes into `v0/design`; never overwrite another branch's unrelated work.

## Checks before declaring success

1. Verify `mock/main.tsx` imports `../resources/js/pages/welcome` and `../resources/js/pages/updates/show`, passing the required props.
2. Verify that `mock/welcome.tsx` does **not** exist.
3. Check the preview build and routes, then Laravel build, Inertia navigation/props, and relevant PHP tests where the environments are available.
4. Distinguish **Git commit/push success** from **runtime preview success**; do not claim an untested preview works.
5. Existing project-wide rules (including `.ai/rules/js.md`) still apply; this file adds workflow constraints and does not override them.
