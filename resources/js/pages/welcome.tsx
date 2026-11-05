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
    },
    {
        number: '02',
        title: 'Lucida',
        category: 'Generative visual system',
        year: '2025',
        background: 'radial-gradient(ellipse at 65% 40%, #a5a6dc 0%, #555788 27%, #171727 65%, #090910 100%)',
    },
    {
        number: '03',
        title: 'Echoes',
        category: 'Immersive experience',
        year: '2025',
        background: 'linear-gradient(145deg, #57534e 0%, #262626 55%, #eb4b2a 56%, #a82917 100%)',
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
                <header className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-6 px-6 py-7 sm:px-10 lg:px-16">
                    <a href="#top" className="text-lg font-bold tracking-[-0.07em]">
                        NOISE / FORM<span className="align-top text-[10px]">®</span>
                    </a>
                    <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-6 text-[11px] font-semibold tracking-[0.13em] uppercase sm:gap-9">
                        <a href="#work" className="transition-colors hover:text-[#ff5634]">Work</a>
                        <a href="#studio" className="transition-colors hover:text-[#ff5634]">Studio</a>
                        <a href="#services" className="transition-colors hover:text-[#ff5634]">Services</a>
                        <a href="#contact" className="transition-colors hover:text-[#ff5634]">Contact</a>
                    </nav>
                </header>

                <div className="relative mx-auto grid min-h-[690px] max-w-[1440px] items-center gap-8 px-6 pb-24 pt-16 sm:px-10 lg:grid-cols-[1.12fr_0.88fr] lg:px-16 lg:py-24">
                    <div className="relative z-10">
                        <p className="mb-8 max-w-[19rem] text-[10px] font-medium leading-5 tracking-[0.2em] text-[#c3bdb6] uppercase">
                            Independent creative technology studio
                            <span className="block">Berlin — Est. 2023</span>
                        </p>
                        <span className="mb-7 block h-[3px] w-9 bg-[#ff5634]" aria-hidden="true" />
                        <h1 className="max-w-[900px] text-[clamp(3.1rem,7.1vw,7.6rem)] font-bold leading-[0.89] tracking-[-0.075em] uppercase">
                            Digital
                            <br />
                            experiences
                            <br />
                            with a <span className="text-[#ff5634]">pulse.</span>
                        </h1>
                        <a href="#work" className="mt-12 inline-flex items-center gap-3 border-b border-white/60 pb-2 text-xs font-semibold tracking-[0.13em] uppercase transition-colors hover:border-[#ff5634] hover:text-[#ff5634]">
                            Explore our work <span aria-hidden="true">↗</span>
                        </a>
                    </div>

                    {/* Deliberately simple CSS placeholder artwork for v0 to refine. */}
                    <div aria-hidden="true" className="relative min-h-[330px] overflow-hidden lg:min-h-[590px]">
                        <div className="absolute inset-[8%] rotate-[-22deg] rounded-[42%_58%_35%_65%] bg-[radial-gradient(ellipse_at_25%_20%,#ffbe9c_0%,#fa5735_17%,#a92518_38%,#1a0d0a_68%,transparent_73%)] blur-[1px]" />
                        <div className="absolute left-[20%] top-[15%] h-[60%] w-[69%] rotate-[35deg] rounded-[55%_38%_60%_40%] border-[18px] border-[#f4f0ec]/70 shadow-[inset_12px_0_35px_#f95a37,12px_18px_48px_#ed3f1e]/40 sm:border-[28px]" />
                        <div className="absolute left-[29%] top-[31%] h-[38%] w-[42%] rotate-[-28deg] rounded-[46%] bg-[#0b0b0b] shadow-[inset_20px_15px_24px_#f45131,0_0_36px_#f45131]/30" />
                        <p className="absolute bottom-5 right-0 text-[10px] tracking-[0.22em] text-[#a8a39d] uppercase">Abstract study / 001</p>
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
                                <div className="group relative flex aspect-[5/4] items-center justify-center overflow-hidden" style={{ background: project.background }}>
                                    <span className="text-[clamp(4rem,9vw,9rem)] font-bold tracking-[-0.09em] text-white/20" aria-hidden="true">{project.number}</span>
                                    <span className="absolute bottom-5 left-5 text-[10px] tracking-[0.18em] text-white/80 uppercase">
                                        Visual placeholder
                                    </span>
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
                    <div className="relative flex aspect-[4/3] items-end overflow-hidden bg-[#292b2c] p-7">
                        <div aria-hidden="true" className="absolute left-[15%] top-0 h-full w-px bg-white/15" />
                        <div aria-hidden="true" className="absolute left-[45%] top-0 h-full w-px bg-white/15" />
                        <div aria-hidden="true" className="absolute bottom-[25%] left-0 h-px w-full bg-white/15" />
                        <div aria-hidden="true" className="absolute right-[-10%] top-[-30%] h-[110%] w-[65%] rotate-[25deg] bg-[linear-gradient(90deg,transparent,#a3a3a3)] opacity-40" />
                        <span className="relative z-10 text-[10px] tracking-[0.18em] text-white/80 uppercase">
                            Studio photography placeholder
                        </span>
                    </div>
                </div>
            </section>

            {/* 05 / Contact */}
            <section id="contact" className="relative overflow-hidden px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
                <div className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-[80%] w-[65%] rounded-full bg-[radial-gradient(ellipse,#75757566,transparent_65%)] blur-3xl" aria-hidden="true" />
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
