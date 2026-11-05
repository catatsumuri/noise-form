// Preview-only fixtures; Laravel reads articles from the database.
import type { UpdateArticle } from '../resources/js/types/update';

export const previewArticles: Record<string, UpdateArticle> = {
    'new-chapter-in-berlin': {
        slug: 'new-chapter-in-berlin',
        date: '05.2026',
        type: 'Studio note',
        title: 'Noise / Form opens a new chapter in Berlin.',
        description:
            'A tighter team, wider field of view, and more room for experiments at the edge of design and technology.',
        image: '/images/noise-form/studio.webp',
        imageAlt: 'An airy creative studio workspace in afternoon sunlight',
        paragraphs: [
            'New spaces make new conversations possible. Our studio is entering a new chapter, bringing together designers, developers, and artists around a shared commitment to experimentation.',
            'From interactive installations to digital identities, our work explores the meeting point between code, motion, image, and sound. The aim is not to follow trends but to find forms that feel unmistakably alive.',
            'We are looking ahead with more room to test ideas, discover unexpected collaborations, and make the unfamiliar feel inevitable.',
        ],
    },
    'signal-field-enters-the-world': {
        slug: 'signal-field-enters-the-world',
        date: '03.2026',
        type: 'New work',
        title: 'Signal Field enters the world.',
        description:
            'Our latest interactive installation turns motion, light, and sound into a shared physical language.',
        image: '/images/noise-form/signal-field.webp',
        imageAlt:
            'An abstract black mineral surface illuminated by glowing orange light',
        paragraphs: [
            'Signal Field begins with a simple question: what if an environment could listen as closely as it speaks? The work responds to movement with changing patterns of light and sound.',
            'Instead of a conventional interface, visitors encounter a material world that shifts around their presence. Each interaction changes the composition in subtle, unpredictable ways.',
            'The project is a fictional case study developed for the NOISE / FORM design experiment.',
        ],
    },
    'the-feeling-of-digital-matter': {
        slug: 'the-feeling-of-digital-matter',
        date: '11.2025',
        type: 'Field note',
        title: 'Researching the feeling of digital matter.',
        description:
            'Notes from our ongoing study of texture, atmosphere, and the spaces between screen and body.',
        image: '/images/noise-form/lucida.webp',
        imageAlt: 'Translucent lavender spheres suspended in deep blue light',
        paragraphs: [
            'Digital material is often described through resolution, speed, and precision. But atmosphere, texture, and rhythm matter just as much to the feeling of an experience.',
            'We have been experimenting with generative forms, reflected light, and movement to understand how visual systems can suggest weight, softness, or tension.',
            'These studies are not finished products. They are a collection of questions about the expressive possibilities of digital space.',
        ],
    },
};
