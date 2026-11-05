---
paths:
    - 'resources/js/pages/welcome.tsx'
    - 'resources/js/pages/updates/**'
    - 'mock/**'
    - 'vite.preview.config.ts'
    - 'vite.config.ts'
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

## Build and branch boundaries

- `v0/design` is the design/preview branch. The Laravel integration branch is `feat/noise-form`; `main` is not the target for experimental changes.
- `npm run dev:preview` and `npm run build:preview` use `vite.preview.config.ts` for a PHP-free v0 preview. `npm run dev` and `npm run build` use the Laravel Vite configuration in `vite.config.ts`.
- Do not change the default Vite config to preview-only behavior. Do not copy `mock/`, root `index.html`, or preview-only Vite config into the Laravel-only integration branch.
- When syncing design to Laravel, transfer the actual shared page components and any required assets/types/app changes, not the preview runtime. Preserve new Laravel controller/model/route/migration changes.
- If v0 creates a new branch, compare and intentionally merge its UI changes into `v0/design`; never overwrite another branch's unrelated work.

## Checks before declaring success

1. Verify `mock/main.tsx` imports `../resources/js/pages/welcome` and `../resources/js/pages/updates/show`, passing the required props.
2. Verify that `mock/welcome.tsx` does **not** exist.
3. Check the preview build and routes, then Laravel build, Inertia navigation/props, and relevant PHP tests where the environments are available.
4. Distinguish **Git commit/push success** from **runtime preview success**; do not claim an untested preview works.
5. Existing project-wide rules (including `.ai/rules/js.md`) still apply; this file adds workflow constraints and does not override them.
