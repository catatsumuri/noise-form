// Static content only. No Inertia hooks, page props, forms, or backend calls.
// v0 will refine this actual React component in the design branch.
const projects = [
    {
        number: '01',
        name: 'Signal Field',
        category: 'Interactive installation',
        year: '2026',
        description: 'An immersive experience shaped by movement and sound.',
    },
    {
        number: '02',
        name: 'Lucida',
        category: 'Generative visual system',
        year: '2025',
        description: 'A living visual identity made from light and motion.',
    },
    {
        number: '03',
        name: 'Echoes',
        category: 'Digital experience',
        year: '2025',
        description: 'An experimental space between architecture and interaction.',
    },
];

const capabilities = [
    'Creative development',
    'Interactive experiences',
    'Motion and visualization',
    'Brand and identity',
    'Experimental R&D',
];

export default function Welcome() {
    return (
        <main id="top" className="min-h-screen bg-white font-sans text-neutral-900">
            <title>NOISE / FORM — Creative Technology Studio</title>
            <header className="border-b border-neutral-200">
                <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-6">
                    <a href="#top" className="text-lg font-semibold tracking-tight">
                        NOISE / FORM®
                    </a>
                    <nav aria-label="Main navigation" className="flex flex-wrap gap-6 text-sm">
                        <a href="#work" className="hover:underline">Work</a>
                        <a href="#services" className="hover:underline">Services</a>
                        <a href="#studio" className="hover:underline">Studio</a>
                        <a href="#contact" className="hover:underline">Contact</a>
                    </nav>
                </div>
            </header>

            <div className="mx-auto max-w-6xl px-6">
                <section aria-labelledby="hero-heading" className="border-b border-neutral-200 py-24 sm:py-32">
                    <p className="mb-8 text-sm tracking-widest uppercase">Independent creative technology studio · Berlin</p>
                    <h1 id="hero-heading" className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-7xl">
                        Digital experiences with a pulse.
                    </h1>
                    <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-600">
                        We build distinct digital experiences across design, code, motion, and sound.
                    </p>
                    <a href="#work" className="mt-10 inline-block border-b border-neutral-900 pb-1 text-sm font-medium">
                        Explore selected work ↓
                    </a>
                </section>

                <section id="manifesto" aria-labelledby="manifesto-heading" className="grid gap-8 border-b border-neutral-200 py-20 md:grid-cols-2">
                    <div>
                        <p className="mb-5 text-xs font-medium tracking-widest uppercase">01 / Manifesto</p>
                        <h2 id="manifesto-heading" className="text-4xl font-semibold tracking-tight sm:text-5xl">
                            We make the unfamiliar feel inevitable.
                        </h2>
                    </div>
                    <p className="max-w-md text-lg leading-8 text-neutral-600 md:pt-12">
                        A creative studio at the intersection of design, technology, and culture.
                        We craft experiences that move people — visually, emotionally, and physically.
                    </p>
                </section>

                <section id="work" aria-labelledby="work-heading" className="border-b border-neutral-200 py-20">
                    <p className="mb-5 text-xs font-medium tracking-widest uppercase">02 / Selected work</p>
                    <h2 id="work-heading" className="text-4xl font-semibold tracking-tight">Selected projects</h2>
                    <div className="mt-10 grid gap-8 md:grid-cols-3">
                        {projects.map((project) => (
                            <article key={project.number}>
                                <div aria-hidden="true" className="flex aspect-[4/3] items-center justify-center bg-neutral-100 text-xs tracking-widest text-neutral-400">
                                    Project visual {project.number}
                                </div>
                                <p className="mt-5 text-xs tracking-wider text-neutral-500 uppercase">
                                    {project.category} · {project.year}
                                </p>
                                <h3 className="mt-2 text-2xl font-semibold">{project.name}</h3>
                                <p className="mt-2 text-sm leading-6 text-neutral-600">{project.description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="services" aria-labelledby="services-heading" className="grid gap-8 border-b border-neutral-200 py-20 md:grid-cols-2">
                    <div>
                        <p className="mb-5 text-xs font-medium tracking-widest uppercase">03 / What we do</p>
                        <h2 id="services-heading" className="text-4xl font-semibold tracking-tight sm:text-5xl">
                            Design. Code. Motion. Sound.
                        </h2>
                    </div>
                    <ul className="space-y-3 text-lg">
                        {capabilities.map((capability) => (
                            <li key={capability} className="border-b border-neutral-200 pb-3">
                                {capability}
                            </li>
                        ))}
                    </ul>
                </section>

                <section id="studio" aria-labelledby="studio-heading" className="grid gap-8 border-b border-neutral-200 py-20 md:grid-cols-2">
                    <div>
                        <p className="mb-5 text-xs font-medium tracking-widest uppercase">04 / Studio</p>
                        <h2 id="studio-heading" className="text-4xl font-semibold tracking-tight sm:text-5xl">
                            Independent by nature. Collaborative by design.
                        </h2>
                    </div>
                    <p className="max-w-md text-lg leading-8 text-neutral-600">
                        Based in Berlin, we are a small multidisciplinary team of designers,
                        developers, and artists exploring what comes next in digital expression.
                    </p>
                </section>

                <section id="contact" aria-labelledby="contact-heading" className="py-20 sm:py-28">
                    <p className="mb-5 text-xs font-medium tracking-widest uppercase">05 / Contact</p>
                    <h2 id="contact-heading" className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
                        Have a project in mind? Let’s talk.
                    </h2>
                    <p className="mt-6 text-sm text-neutral-600">
                        Contact functionality will be added in a later phase.
                    </p>
                </section>
            </div>

            <footer className="border-t border-neutral-200">
                <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 px-6 py-7 text-sm">
                    <span>NOISE / FORM® — Concept project</span>
                    <span>Berlin, Germany</span>
                    <a href="#top" className="hover:underline">Back to top ↑</a>
                </div>
            </footer>
        </main>
    );
}
