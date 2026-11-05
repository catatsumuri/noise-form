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
        <main className="min-h-screen bg-[#101010] font-sans text-[#f4f1eb] antialiased">
            <title>{article.title} — NOISE / FORM</title>

            <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#101010]/80 text-[#f4f1eb] backdrop-blur-xl">
                <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 sm:px-10 lg:px-16">
                    <a className="text-lg font-bold tracking-[-0.07em]" href="/">
                        NOISE / FORM<span className="align-top text-[10px]">®</span>
                    </a>
                    <nav className="flex gap-5 text-[10px] font-semibold tracking-[0.16em] uppercase sm:gap-8" aria-label="Article navigation">
                        <a href="/#work" className="transition-colors hover:text-[#ff5634]">Work</a>
                        <a href="/#updates" className="transition-colors hover:text-[#ff5634]">Updates</a>
                        <a href="/#contact" className="transition-colors hover:text-[#ff5634]">Contact</a>
                    </nav>
                </div>
            </header>

            <article>
                <header className="relative isolate mx-auto min-h-[min(760px,78vh)] max-w-[1440px] overflow-hidden px-6 pb-20 pt-36 sm:px-10 lg:grid lg:grid-cols-[minmax(0,1fr)_250px] lg:gap-16 lg:px-16 lg:pb-28 lg:pt-44">
                    <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full lg:w-[72%]">
                        <img
                            src={article.image}
                            alt=""
                            aria-hidden="true"
                            className="h-full w-full object-cover opacity-35 mix-blend-screen [mask-image:linear-gradient(90deg,transparent_0%,black_42%,black_100%)]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#101010] via-[#101010]/55 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-[#101010]/10" />
                    </div>
                    <div className="relative z-10 lg:col-span-2">
                        <a href="/#updates" className="inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.16em] text-[#aaa49b] uppercase transition-colors hover:text-[#ff5634]">
                            <span aria-hidden="true">←</span> All updates
                        </a>
                        <div className="mt-24 max-w-4xl lg:mt-32">
                            <p className="text-[11px] font-semibold tracking-[0.2em] text-[#ff5634] uppercase">
                                {article.date} / {article.type}
                            </p>
                            <h1 className="mt-6 text-[clamp(3.4rem,8vw,9rem)] font-bold leading-[0.86] tracking-[-0.085em]">
                                {article.title}
                            </h1>
                        </div>
                    </div>
                    <div className="relative z-10 mt-16 max-w-sm border-l border-white/15 pl-5 lg:col-start-2 lg:mt-auto lg:pb-2">
                        <p className="text-[10px] font-semibold tracking-[0.16em] text-[#aaa49b] uppercase">Field note / 001</p>
                        <p className="mt-4 text-base leading-7 text-[#d5d0c7]">{article.description}</p>
                    </div>
                    <div className="absolute bottom-8 left-6 z-10 flex items-center gap-3 text-[10px] font-semibold tracking-[0.16em] text-white/50 uppercase sm:left-10 lg:left-16">
                        <span className="h-2 w-2 rounded-full bg-[#ff5634]" aria-hidden="true" />
                        NOISE / FORM — BERLIN
                    </div>
                </header>

                <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-20 sm:px-10 lg:grid-cols-[250px_minmax(0,760px)] lg:gap-24 lg:px-16 lg:py-32">
                    <aside className="text-[10px] font-semibold tracking-[0.16em] text-[#aaa49b] uppercase">
                        <p>From the studio</p>
                        <p className="mt-4 text-[#ff5634]">NOISE / FORM</p>
                    </aside>
                    <div>
                        <div className="space-y-8 text-lg leading-[1.9] text-[#d5d0c7] sm:text-xl">
                            {article.paragraphs.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                        <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-white/15 pt-8">
                            <a href="/#updates" className="inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.16em] uppercase transition-colors hover:text-[#ff5634]">
                                <span aria-hidden="true">←</span> Back to all updates
                            </a>
                            <span className="text-[10px] tracking-[0.16em] text-[#aaa49b] uppercase">11.2025 / Berlin</span>
                        </div>
                    </div>
                </div>
            </article>

            <footer className="border-t border-white/10 bg-[#0b0b0b] px-6 py-8 text-[#f4f1eb] sm:px-10 lg:px-16">
                <div className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-4 text-[10px] tracking-[0.14em] uppercase">
                    <span className="font-semibold">NOISE / FORM®</span>
                    <span className="text-[#aaa49b]">Berlin, Germany — Fictional studio / Design PoC</span>
                    <a href="/" className="transition-colors hover:text-[#ff5634]">Return home ↗</a>
                </div>
            </footer>
        </main>
    );
}
