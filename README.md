# NOISE / FORM

English | [日本語](README.ja.md)

A studio website built with Laravel, Inertia, React, TypeScript, and Tailwind CSS. Design work centers on `welcome.tsx`, with a Laravel backend for articles and inquiries. The same public React pages run in a PHP-free preview for v0.

## What to edit

| Area                                                                     | Source                                           |
| ------------------------------------------------------------------------ | ------------------------------------------------ |
| Landing page: hero, projects, services, studio, contact, article listing | `resources/js/pages/welcome.tsx`                 |
| Article detail layout                                                    | `resources/js/pages/updates/show.tsx`            |
| Shared article prop types                                                | `resources/js/types/update.ts`                   |
| Fictional preview articles                                               | `mock/updates.ts`                                |
| Article and inquiry backend                                              | `app/Http/Controllers/`, `app/Models/Update.php` |

Projects, services, and other landing-page copy are written directly in `welcome.tsx`. Laravel retrieves articles from the database. Editing preview fixtures does not change database content.

## Laravel development

Use PHP 8.3+, Composer, and Node 22 (used in CI). SQLite is the default local database.

```bash
git clone https://github.com/catatsumuri/noise-form.git
cd noise-form
composer setup
composer dev
```

`composer setup` installs PHP/npm dependencies, creates `.env` if missing, generates the application key, runs migrations, and builds Laravel assets. Configure `.env` first if using another database. `composer dev` starts the Laravel development processes, including Vite.

Alternatively, run `php artisan serve` and `npm run dev` in separate terminals. Open the Laravel HTTP server to use the application; Vite serves its frontend assets.

To add sample articles locally:

```bash
php artisan db:seed --class=UpdateSeeder
```

Existing articles with the same slug are preserved. This seeder creates an author record, not a usable administrator login.

## v0 / PHP-free preview

The public-page preview needs neither PHP nor a database:

```bash
npm install
npm run dev:preview
```

Open the URL printed by Vite. `/` renders the landing page; `/updates/{slug}` renders articles from `mock/updates.ts`.

| Mode       | Development           | Build                   | Configuration                               |
| ---------- | --------------------- | ----------------------- | ------------------------------------------- |
| Laravel    | `npm run dev`         | `npm run build`         | `vite.config.ts` → `vite.laravel.config.ts` |
| v0 preview | `npm run dev:preview` | `npm run build:preview` | `vite.preview.config.ts`                    |

For v0's preview environment, select `npm run dev:preview` as the development command and `npm run build:preview` for preview builds. `npm run dev` starts the Laravel asset server. The external v0 project's actual command settings have not been verified here.

`mock/main.tsx` imports the actual public pages. Preview aliases substitute small adapters for Inertia and supply fixture props. Links use ordinary browser navigation. Inquiry submissions show a preview message and are not saved. Authentication and admin screens are outside the preview's scope.

Keep one UI source: edit the real page components rather than creating a separate mock page or Next.js app. Update preview fixtures/adapters when adding props or Inertia APIs. See [preview notes](mock/README.md) and [workflow rules](.ai/rules/inertia-v0-workflow.md).

## Branch workflow

1. Make design/preview changes on `v0/design` and commit there.
2. Check the preview and Laravel behavior relevant to the change.
3. Merge `v0/design` into `main`, preserving Laravel backend changes.
4. Push both branches when publishing the changes.

`main` is the Laravel integration branch. Both branches retain preview files; the default Vite configuration remains Laravel-oriented. If v0 creates another branch, review and merge its UI changes into `v0/design` first.

## Backend

| Route              | Purpose                                                          |
| ------------------ | ---------------------------------------------------------------- |
| `/`                | Landing page with published articles from `HomeController`       |
| `/updates/{slug}`  | Published article detail                                         |
| `POST /inquiries`  | Validate and save inquiries; limited to five requests per minute |
| `/admin/updates`   | Create, view, edit, and delete articles                          |
| `/admin/inquiries` | View received inquiries                                          |

Articles support drafts (empty `published_at`), scheduled publication, and published content. Public pages only return articles whose publication time has arrived. Bodies are paragraph arrays. Image paths are displayed, but the article editor does not provide image uploads.

Admin routes currently require authentication and a verified email, without a separate administrator-role check. Starter-kit authentication and account settings remain available. Inquiries are stored in the database; the current controller does not send notification emails.

## Checks

```bash
npm run check          # Formatting and lint
npm run check:fix      # Apply formatting/lint fixes
npm run types:check    # TypeScript
composer lint:check   # PHP formatting
composer types:check  # PHPStan
composer test         # PHP formatting, PHPStan, PHPUnit
composer ci:check     # Frontend checks, then composer test
```

With a running Laravel Sail environment, prefix commands with `./vendor/bin/sail`, for example `./vendor/bin/sail composer ci:check`.

CI runs `composer setup` and `composer ci:check` for pushes to `main` and pull requests. Run `npm run build:preview` separately when changing public pages or preview adapters. Preview output in `dist/` is ignored by Git, formatting, and lint.

## Inherited i18n support

Based on the Laravel + React Starter Kit — i18n Edition. Authentication and settings retain English/Japanese translation support. Public-page copy is currently written directly in the page components.

Add translation source strings to `lang/vendor-patches/source/react.json` and translations to `lang/vendor-patches/locales/{locale}.json`, then regenerate:

```bash
composer patch-vendor
php artisan lang:update
```

Generated `lang/` output is ignored by Git. See [translation rules](.ai/rules/lang.md) and [starter-kit translation patches](.ai/rules/starter-kits.md).

## License

MIT
