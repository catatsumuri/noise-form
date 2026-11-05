// Render-only article detail page. Laravel can later pass an article as an
// Inertia page prop; the v0 preview supplies the exact same prop from mock data.
export type UpdateArticle = {
    slug: string;
    date: string;
    type: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    paragraphs: string[];
};

type Props = {
    article: UpdateArticle;
};

export default function Show({ article }: Props) {
    return (
        <main className="min-h-screen bg-[#f0eee8] font-sans text-[#111111] antialiased">
            <title>{article.title} — NOISE / FORM</title>

            <header className="border-b border-black/15 bg-[#0b0b0b] text-[#f4f1eb]">
                <div className="mx-auto flex max-w-[1312px] flex-wrap items-center justify-between gap-6 px-6 py-6 sm:px-10 lg:px-16">
                    <a className="text-lg font-bold tracking-[-0.07em]" href="/">
                        NOISE / FORM<span className="align-top text-[10px]">®</span>
                    </a>
                    <nav className="flex gap-6 text-[11px] font-semibold tracking-[0.12em] uppercase" aria-label="Article navigation">
                        <a href="/#work" className="hover:text-[#ff5634]">Work</a>
                        <a href="/#updates" className="hover:text-[#ff5634]">Updates</a>
                        <a href="/#contact" className="hover:text-[#ff5634]">Contact</a>
                    </nav>
                </div>
            </header>

            <article>
                <header className="mx-auto max-w-[1312px] px-6 pb-14 pt-20 sm:px-10 lg:px-16 lg:pb-24 lg:pt-28">
                    <a href="/#updates" className="text-xs font-semibold tracking-[0.11em] uppercase hover:underline">
                        ← All updates
                    </a>
                    <p className="mt-16 text-[11px] font-semibold tracking-[0.17em] text-[#cf472a] uppercase">
                        {article.date} / {article.type}
                    </p>
                    <h1 className="mt-7 max-w-5xl text-[clamp(3.2rem,6.8vw,7.5rem)] font-bold leading-[0.94] tracking-[-0.07em]">
                        {article.title}
                    </h1>
                    <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-600">
                        {article.description}
                    </p>
                </header>

                <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
                    <img
                        src={article.image}
                        alt={article.imageAlt}
                        className="aspect-[16/9] w-full bg-[#171717] object-cover"
                    />
                </div>

                <div className="mx-auto max-w-[860px] px-6 py-20 sm:px-10 lg:py-28">
                    <p className="mb-10 text-[11px] font-semibold tracking-[0.14em] text-[#cf472a] uppercase">
                        From the studio / NOISE / FORM
                    </p>
                    <div className="space-y-8 text-lg leading-[1.9] text-[#252525] sm:text-xl">
                        {article.paragraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                    <div className="mt-20 border-t border-black/20 pt-8">
                        <a
                            href="/#updates"
                            className="inline-flex gap-3 text-xs font-semibold tracking-[0.12em] uppercase hover:text-[#cf472a]"
                        >
                            <span aria-hidden="true">←</span> Back to all updates
                        </a>
                    </div>
                </div>
            </article>

            <footer className="bg-[#0b0b0b] px-6 py-8 text-[#f4f1eb] sm:px-10 lg:px-16">
                <div className="mx-auto flex max-w-[1312px] flex-wrap justify-between gap-4 text-[11px] tracking-[0.1em] uppercase">
                    <span className="font-semibold">NOISE / FORM®</span>
                    <span className="text-[#aaa49b]">Berlin, Germany — Fictional studio / Design PoC</span>
                    <a href="/" className="hover:text-[#ff5634]">Return home ↗</a>
                </div>
            </footer>
        </main>
    );
}
