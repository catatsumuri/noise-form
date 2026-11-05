# NOISE / FORM design preview

Run `npm run dev:preview` for the PHP-free preview, or `npm run build:preview`
for a static build. The preview uses `vite.preview.config.ts` and `index.html`.

- `/` renders `mock/welcome.tsx`, an independent static design snapshot.
- `/updates/{slug}` renders `resources/js/pages/updates/show.tsx` with fixture
  props supplied by `mock/updates.ts`.
- `resources/js/pages/welcome.tsx` is the Laravel/Inertia page. The preview
  does not import it. Its updates come from the database through Inertia props.

Normal `npm run dev` and `npm run build` use the Laravel configuration.
The existing `dev:laravel` and `build:laravel` aliases also remain available.

Article fixtures are fictional. Laravel does not read mock data.
