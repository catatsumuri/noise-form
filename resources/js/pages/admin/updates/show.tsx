import { Form, Head, Link, setLayoutProps } from '@inertiajs/react';
import { lang } from '@erag/lang-sync-inertia/react';
import { Button, buttonVariants } from '@/components/ui/button';

type Article = {
    id: number;
    title: string;
    slug: string;
    description: string;
    category: string;
    body: string[];
    imagePath: string | null;
    imageAlt: string | null;
    publishedAt: string | null;
    status: string;
};

export default function ArticleShow({
    article,
    locale,
    timezone,
    saved = false,
}: {
    article: Article;
    locale: string;
    timezone: string;
    saved?: boolean;
}) {
    const { __ } = lang();
    setLayoutProps({
        breadcrumbs: [
            { title: __('Articles'), href: '/admin/updates' },
            { title: article.title, href: `/admin/updates/${article.id}` },
        ],
    });
    const fields = [
        [__('Title'), article.title],
        [__('Slug'), article.slug],
        [__('Category'), article.category],
        [__('Status'), __(article.status)],
        [
            __('Published at'),
            article.publishedAt
                ? new Intl.DateTimeFormat(locale.replace('_', '-'), {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                      timeZone: timezone,
                  }).format(new Date(article.publishedAt))
                : '—',
        ],
        [__('Description'), article.description],
        [__('Image path'), article.imagePath || '—'],
        [__('Image alt text'), article.imageAlt || '—'],
    ];

    return (
        <>
            <Head title={article.title} />
            <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
                <Link
                    href="/admin/updates"
                    className="w-fit text-sm underline underline-offset-4"
                >
                    {__('Back to articles')}
                </Link>
                <div className="flex items-start justify-between gap-4">
                    <h1 className="text-xl font-semibold">{article.title}</h1>
                    <Link
                        href={`/admin/updates/${article.id}/edit`}
                        className={buttonVariants()}
                    >
                        {__('Edit')}
                    </Link>
                </div>
                {saved && (
                    <p role="status" className="text-sm text-muted-foreground">
                        {__('Saved.')}
                    </p>
                )}
                <dl className="divide-y rounded-xl border">
                    {fields.map(([label, value]) => (
                        <div
                            key={label}
                            className="grid gap-2 px-4 py-4 sm:grid-cols-[10rem_1fr]"
                        >
                            <dt className="text-sm font-medium text-muted-foreground">
                                {label}
                            </dt>
                            <dd className="min-w-0 text-sm break-words whitespace-pre-wrap">
                                {value}
                            </dd>
                        </div>
                    ))}
                    <div className="grid gap-2 px-4 py-4 sm:grid-cols-[10rem_1fr]">
                        <dt className="text-sm font-medium text-muted-foreground">
                            {__('Body')}
                        </dt>
                        <dd className="min-w-0 space-y-4 text-sm leading-6">
                            {article.body.map((paragraph, index) => (
                                <p
                                    key={index}
                                    className="break-words whitespace-pre-wrap"
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </dd>
                    </div>
                </dl>
                <Form
                    action={`/admin/updates/${article.id}`}
                    method="delete"
                    onBefore={() =>
                        window.confirm(
                            __('Delete this article? This cannot be undone.'),
                        )
                    }
                >
                    {({ processing }) => (
                        <Button
                            type="submit"
                            variant="destructive"
                            disabled={processing}
                        >
                            {__('Delete article')}
                        </Button>
                    )}
                </Form>
            </div>
        </>
    );
}
