export type UpdateSummary = {
    slug: string;
    title: string;
    description: string;
    type: string;
    date: string;
    image: string | null;
    imageAlt: string | null;
};

export type UpdateArticle = UpdateSummary & {
    paragraphs: string[];
};
