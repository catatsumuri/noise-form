import { Head, Link, setLayoutProps } from '@inertiajs/react';
import { lang } from '@erag/lang-sync-inertia/react';
import { buttonVariants } from '@/components/ui/button';

type Article = {
    id: number;
    title: string;
    url: string | null;
    category: string;
    publishedAt: string | null;
    status: string;
};

export default function ArticleIndex({
    articles,
    locale,
    timezone,
}: {
    articles: Article[];
    locale: string;
    timezone: string;
}) {
    const { __ } = lang();

    setLayoutProps({
        breadcrumbs: [{ title: __('Articles'), href: '/admin/updates' }],
    });

    return (
        <>
            <Head title={__('Articles')} />
            <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-semibold">
                            {__('Articles')}
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {__('Total: :count').replace(
                                ':count',
                                String(articles.length),
                            )}
                        </p>
                    </div>
                    <Link
                        href="/admin/updates/create"
                        className={buttonVariants()}
                    >
                        {__('New article')}
                    </Link>
                </div>
                <div className="overflow-x-auto rounded-xl border">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b bg-muted/50 text-muted-foreground">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-4 py-3 font-medium"
                                >
                                    {__('Title')}
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 font-medium"
                                >
                                    {__('Category')}
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 font-medium"
                                >
                                    {__('Status')}
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 font-medium"
                                >
                                    {__('Published at')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {articles.map((article) => (
                                <tr key={article.id}>
                                    <td className="min-w-56 px-4 py-4 font-medium">
                                        {article.url ? (
                                            <Link
                                                href={article.url}
                                                className="underline underline-offset-4 hover:text-muted-foreground"
                                            >
                                                {article.title}
                                            </Link>
                                        ) : (
                                            article.title
                                        )}
                                    </td>
                                    <td className="px-4 py-4">
                                        {article.category}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        {__(article.status)}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-muted-foreground">
                                        {article.publishedAt
                                            ? new Intl.DateTimeFormat(
                                                  locale.replace('_', '-'),
                                                  {
                                                      dateStyle: 'medium',
                                                      timeStyle: 'short',
                                                      timeZone: timezone,
                                                  },
                                              ).format(
                                                  new Date(article.publishedAt),
                                              )
                                            : '—'}
                                    </td>
                                </tr>
                            ))}
                            {articles.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-4 py-12 text-center text-muted-foreground"
                                    >
                                        {__('No articles yet.')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
