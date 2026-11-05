// NOISE / FORM — Phase 1: a static, single-page design baseline.
// This exact component runs in Laravel/Inertia and the PHP-free v0 preview.
// No Inertia hooks, server props, routing, authentication or API requests.

const projects = [
    {
        number: '01',
        title: 'Signal Field',
        category: 'Interactive installation',
        year: '2026',
        background: 'linear-gradient(135deg, #0d0d0d 0%, #3b1b16 40%, #f14826 100%)',
        image: '/images/noise-form/signal-field.webp',
        alt: 'Molten orange glass flowing through fractured dark stone',
    },
    {
        number: '02',
        title: 'Lucida',
        category: 'Generative visual system',
        year: '2025',
        background: 'radial-gradient(ellipse at 65% 40%, #a5a6dc 0%, #555788 27%, #171727 65%, #090910 100%)',
        image: '/images/noise-form/lucida.webp',
        alt: 'Luminous translucent lavender spheres floating in darkness',
    },
    {
        number: '03',
        title: 'Echoes',
        category: 'Immersive experience',
        year: '2025',
        background: 'linear-gradient(145deg, #57534e 0%, #262626 55%, #eb4b2a 56%, #a82917 100%)',
        image: '/images/noise-form/echoes.webp',
        alt: 'Concrete gallery with orange sculptural installation and dramatic daylight',
    },
];

const services = [
    'Creative development',
    'Interactive experiences',
    'Motion & visualization',
    'Brand & identity',
    'Experimental R&D',
];

export default function Welcome() {
    return (
        <main id="top" className="min-h-screen overflow-x-hidden bg-[#0b0b0b] font-sans text-[#f4f1eb] antialiased">
            <title>NOISE / FORM — Creative Technology Studio</title>

            {/* 00 / Header and hero */}
            <section className="relative isolate overflow-hidden border-b border-white/10">
                <header className="relative z-20 mx-auto flex w-full max-w-[1440px] items-center justify-between gap-5 px-6 py-6 sm:px-10 lg:px-16 lg:py-7">
                    <a href="#top" className="text-lg font-bold tracking-[-0.07em]">
                        NOISE / FORM<span className="align-top text-[10px]">®</span>
                    </a>
                    <nav aria-label="Main navigation" className="flex items-center gap-4 text-[10px] font-semibold tracking-[0.13em] uppercase sm:gap-8 sm:text-[11px]">
                        <a href="#work" className="transition-colors hover:text-[#ff5634]">Work</a>
                        <a href="#studio" className="hidden transition-colors hover:text-[#ff5634] sm:inline">Studio</a>
                        <a href="#services" className="hidden transition-colors hover:text-[#ff5634] sm:inline">Services</a>
                        <a href="#contact" className="transition-colors hover:text-[#ff5634]">Contact</a>
                    </nav>
                </header>

                <div className="relative mx-auto min-h-[calc(100svh-78px)] max-w-[1440px] px-6 pb-14 pt-16 sm:px-10 sm:pb-20 lg:min-h-[690px] lg:px-16 lg:pb-24 lg:pt-20">
                    <div className="pointer-events-none absolute inset-0 z-0 lg:left-[34%]">
                        <img
                            src="/images/noise-form/hero.webp"
                            alt="Abstract sculptural glass loops in orange and silver on a black background"
                            fetchPriority="high"
                            className="h-full w-full object-cover object-[58%_50%] opacity-90 lg:object-[62%_50%]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0b] via-[#0b0b0b]/45 to-transparent lg:via-[#0b0b0b]/15" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-[#0b0b0b]/10" />
                    </div>

                    <div className="relative z-10 flex min-h-[calc(100svh-180px)] flex-col justify-between lg:min-h-[590px]">
                        <div>
                            <p className="mb-7 max-w-[19rem] text-[10px] font-medium leading-5 tracking-[0.2em] text-[#c3bdb6] uppercase">
                                Independent creative technology studio
                                <span className="block">Berlin — Est. 2023</span>
                            </p>
                            <span className="mb-6 block h-[3px] w-9 bg-[#ff5634]" aria-hidden="true" />
                            <h1 className="max-w-[900px] text-[clamp(3.6rem,8.8vw,9.4rem)] font-bold leading-[0.82] tracking-[-0.085em] uppercase">
                                Digital
                                <br />
                                experiences
                                <br />
                                with a <span className="text-[#ff5634]">pulse.</span>
                            </h1>
                        </div>

                        <div className="flex flex-wrap items-end justify-between gap-8 pt-14 lg:pt-10">
                            <a href="#work" className="inline-flex items-center gap-3 border-b border-white/60 pb-2 text-xs font-semibold tracking-[0.13em] uppercase transition-colors hover:border-[#ff5634] hover:text-[#ff5634]">
                                Explore our work <span aria-hidden="true">↗</span>
                            </a>
                            <p className="text-[10px] tracking-[0.22em] text-[#a8a39d] uppercase">Abstract study / 001</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 01 / Manifesto */}
            <section id="manifesto" className="bg-[#f0eee8] px-6 py-20 text-[#121212] sm:px-10 lg:px-16 lg:py-28">
                <div className="mx-auto grid max-w-[1312px] gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
                    <div>
                        <p className="mb-6 text-[11px] font-semibold tracking-[0.12em] uppercase">01 / Manifesto</p>
                        <h2 className="max-w-[700px] text-[clamp(2.8rem,5.2vw,5.8rem)] font-bold leading-[0.96] tracking-[-0.07em]">
                            We make the unfamiliar feel inevitable.
                        </h2>
                    </div>
                    <div className="self-end text-base leading-8 lg:pb-2 lg:text-lg">
                        <p>A creative studio at the intersection of design, technology, and culture.</p>
                        <p className="mt-6">We craft digital experiences that move people — visually, emotionally, and physically.</p>
                        <span className="mt-8 block h-[3px] w-9 bg-[#ff5634]" aria-hidden="true" />
                    </div>
                </div>
            </section>

            {/* 02 / Work */}
            <section id="work" className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
                <div className="mx-auto max-w-[1312px]">
                    <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
                        <div>
                            <p className="mb-4 text-[11px] font-semibold tracking-[0.13em] uppercase">02 / Selected work</p>
                            <h2 className="text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">Work, not wallpaper.</h2>
                        </div>
                        <p className="text-xs tracking-[0.13em] text-[#a8a39d] uppercase">Selected projects / 2025—26</p>
                    </div>
                    <div className="grid gap-8 lg:grid-cols-3">
                        {projects.map((project) => (
                            <article key={project.number}>
                                <div className="group relative aspect-[5/4] overflow-hidden" style={{ background: project.background }}>
                                    <img
                                        src={project.image}
                                        alt={project.alt}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                                    />
                                </div>
                                <div className="mt-5 flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="text-2xl font-semibold tracking-[-0.05em]">{project.title}</h3>
                                        <p className="mt-1 text-[11px] tracking-[0.1em] text-[#a9a39d] uppercase">{project.category} / {project.year}</p>
                                    </div>
                                    <span className="text-xl text-[#d0cac2]" aria-hidden="true">↗</span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* 03 / Services */}
            <section id="services" className="bg-[#ff5634] px-6 py-20 text-[#111111] sm:px-10 lg:px-16 lg:py-24">
                <div className="mx-auto grid max-w-[1312px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
                    <div>
                        <p className="mb-6 text-[11px] font-semibold tracking-[0.13em] uppercase">03 / What we do</p>
                        <h2 className="text-[clamp(3rem,5.5vw,6rem)] font-bold leading-[0.94] tracking-[-0.07em]">
                            Design. Code.
                            <br />
                            Motion. Sound.
                        </h2>
                    </div>
                    <ul className="self-center">
                        {services.map((service) => (
                            <li key={service} className="border-b border-black/30 py-3 text-sm font-medium tracking-[0.1em] uppercase first:border-t">
                                {service}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* 04 / Studio */}
            <section id="studio" className="bg-[#f0eee8] px-6 py-20 text-[#111111] sm:px-10 lg:px-16 lg:py-24">
                <div className="mx-auto grid max-w-[1312px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    <div>
                        <p className="mb-6 text-[11px] font-semibold tracking-[0.13em] uppercase">04 / Studio</p>
                        <h2 className="max-w-xl text-[clamp(2.7rem,4.2vw,5rem)] font-bold leading-[0.98] tracking-[-0.07em]">
                            Independent by nature. Collaborative by design.
                        </h2>
                        <p className="mt-7 max-w-md text-base leading-8">
                            Based in Berlin, we are a small multidisciplinary team of designers,
                            developers, and artists exploring what comes next in digital expression.
                        </p>
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#292b2c]">
                        <img
                            src="/images/noise-form/studio.webp"
                            alt="Creative studio workspace with industrial windows, desks and warm sunlight"
                            loading="lazy"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* 05 / Contact */}
            <section id="contact" className="relative overflow-hidden px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
                <img
                    src="/images/noise-form/contact.webp"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="pointer-events-none absolute inset-y-0 right-0 h-full w-[75%] object-cover object-center opacity-50 [mask-image:linear-gradient(to_right,transparent_0%,black_70%)]"
                />
                <div className="relative mx-auto max-w-[1312px]">
                    <p className="mb-7 text-[11px] font-semibold tracking-[0.13em] uppercase">05 / Contact</p>
                    <h2 className="max-w-5xl text-[clamp(3.4rem,7vw,8rem)] font-bold leading-[0.92] tracking-[-0.075em] uppercase">
                        Have a project
                        <br />
                        in mind?
                        <br />
                        <span className="text-[#ff5634]">Let’s talk.</span>
                    </h2>
                    <p className="mt-9 text-sm text-[#aaa49b]">Contact functionality will be added in a later phase.</p>
                </div>
            </section>

            <footer className="border-t border-white/20 px-6 py-8 sm:px-10 lg:px-16">
                <div className="mx-auto flex max-w-[1312px] flex-wrap items-center justify-between gap-6 text-[11px] tracking-[0.1em] uppercase">
                    <span className="font-semibold text-[#f4f1eb]">NOISE / FORM®</span>
                    <span className="text-[#aaa49b]">Berlin, Germany — Fictional studio / Design PoC</span>
                    <a href="#top" className="transition-colors hover:text-[#ff5634]">Back to top ↑</a>
                </div>
            </footer>
        </main>
    );
}
