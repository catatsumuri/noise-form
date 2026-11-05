import { Form, Head, Link, setLayoutProps } from '@inertiajs/react';
import { lang } from '@erag/lang-sync-inertia/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Article = {
    id: number;
    title: string;
    slug: string;
    description: string;
    category: string;
    body: string[];
    imagePath: string | null;
    imageAlt: string | null;
    publishedAtInput: string | null;
    status: string;
};

export default function ArticleEdit({
    article,
    timezone,
    creating = false,
}: {
    article: Article;
    timezone: string;
    creating?: boolean;
}) {
    const { __ } = lang();
    setLayoutProps({
        breadcrumbs: [
            { title: __('Articles'), href: '/admin/updates' },
            ...(creating
                ? [{ title: __('New article'), href: '/admin/updates/create' }]
                : [
                      {
                          title: article.title,
                          href: `/admin/updates/${article.id}`,
                      },
                      {
                          title: __('Edit'),
                          href: `/admin/updates/${article.id}/edit`,
                      },
                  ]),
        ],
    });

    const textFields = [
        { name: 'title', label: 'Title', value: article.title, maxLength: 255 },
        { name: 'slug', label: 'Slug', value: article.slug, maxLength: 255 },
        {
            name: 'category',
            label: 'Category',
            value: article.category,
            maxLength: 255,
        },
    ] as const;
    const textareaClass =
        'min-h-28 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50';

    return (
        <>
            <Head title={creating ? __('New article') : article.title} />
            <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
                <Link
                    href={
                        creating
                            ? '/admin/updates'
                            : `/admin/updates/${article.id}`
                    }
                    className="w-fit text-sm underline underline-offset-4"
                >
                    {__('Cancel')}
                </Link>
                <div>
                    <h1 className="text-xl font-semibold">
                        {creating ? __('New article') : article.title}
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {__(article.status)}
                    </p>
                </div>
                <Form
                    action={
                        creating
                            ? '/admin/updates'
                            : `/admin/updates/${article.id}`
                    }
                    method={creating ? 'post' : 'patch'}
                    options={{ preserveScroll: true }}
                    className="max-w-3xl space-y-6"
                >
                    {({ errors, processing, recentlySuccessful }) => (
                        <>
                            {textFields.map((field) => (
                                <div key={field.name} className="grid gap-2">
                                    <Label htmlFor={field.name}>
                                        {__(field.label)}
                                    </Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        defaultValue={field.value}
                                        required
                                        maxLength={field.maxLength}
                                        aria-invalid={!!errors[field.name]}
                                    />
                                    <InputError message={errors[field.name]} />
                                </div>
                            ))}
                            <div className="grid gap-2">
                                <Label htmlFor="description">
                                    {__('Description')}
                                </Label>
                                <textarea
                                    id="description"
                                    name="description"
                                    defaultValue={article.description}
                                    required
                                    maxLength={10000}
                                    className={textareaClass}
                                    aria-invalid={!!errors.description}
                                />
                                <InputError message={errors.description} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="body_text">{__('Body')}</Label>
                                <textarea
                                    id="body_text"
                                    name="body_text"
                                    defaultValue={article.body.join('\n\n')}
                                    required
                                    maxLength={100000}
                                    rows={14}
                                    className={textareaClass}
                                    aria-invalid={!!errors.body_text}
                                />
                                <p className="text-sm text-muted-foreground">
                                    {__(
                                        'Separate paragraphs with a blank line.',
                                    )}
                                </p>
                                <InputError message={errors.body_text} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="published_at">
                                    {__('Published at')} ({timezone})
                                </Label>
                                <Input
                                    id="published_at"
                                    name="published_at"
                                    type="datetime-local"
                                    step="1"
                                    defaultValue={
                                        article.publishedAtInput ?? ''
                                    }
                                    aria-invalid={!!errors.published_at}
                                />
                                <p className="text-sm text-muted-foreground">
                                    {__(
                                        'Leave empty for a draft. Set a future date to schedule publication.',
                                    )}
                                </p>
                                <InputError message={errors.published_at} />
                            </div>
                            <dl className="space-y-3 rounded-lg border p-4 text-sm">
                                <div>
                                    <dt className="font-medium">
                                        {__('Image path')}
                                    </dt>
                                    <dd className="mt-1 break-all text-muted-foreground">
                                        {article.imagePath || '—'}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-medium">
                                        {__('Image alt text')}
                                    </dt>
                                    <dd className="mt-1 text-muted-foreground">
                                        {article.imageAlt || '—'}
                                    </dd>
                                </div>
                            </dl>
                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? __('Saving...')
                                        : __('Save changes')}
                                </Button>
                                {recentlySuccessful && (
                                    <p
                                        role="status"
                                        className="text-sm text-muted-foreground"
                                    >
                                        {__('Saved.')}
                                    </p>
                                )}
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}
