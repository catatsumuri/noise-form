import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Welcome from './welcome';
import UpdateShow from '../resources/js/pages/updates/show';
import { previewArticles } from './updates';
import '../resources/css/app.css';

// The mock welcome stays independent of the Laravel/Inertia welcome page.
// Vite's SPA fallback serves index.html on direct article URLs.
const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
const match = /^\/updates\/([a-z0-9-]+)$/.exec(pathname);
const article = match ? previewArticles[match[1]] : undefined;

function PreviewApp() {
    if (pathname === '/') return <Welcome />;
    if (article) return <UpdateShow article={article} />;

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#0b0b0b] px-6 text-center text-white">
            <p className="text-sm tracking-[0.2em] text-[#ff5634] uppercase">404 / Preview</p>
            <h1 className="text-4xl font-bold">Page not found.</h1>
            <a className="underline" href="/">Return home</a>
        </main>
    );
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PreviewApp />
    </StrictMode>,
);
