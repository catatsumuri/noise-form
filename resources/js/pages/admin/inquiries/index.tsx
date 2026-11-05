import { Head, setLayoutProps } from '@inertiajs/react';
import { lang } from '@erag/lang-sync-inertia/react';

type Inquiry = {
    id: number;
    name: string;
    email: string;
    projectDetails: string;
    receivedAt: string;
};

export default function InquiryIndex({
    inquiries,
    locale,
    timezone,
}: {
    inquiries: Inquiry[];
    locale: string;
    timezone: string;
}) {
    const { __ } = lang();
    const dateFormat = new Intl.DateTimeFormat(locale.replace('_', '-'), {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: timezone,
    });

    setLayoutProps({
        breadcrumbs: [{ title: __('Inquiries'), href: '/admin/inquiries' }],
    });

    return (
        <>
            <Head title={__('Inquiries')} />
            <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
                <div>
                    <h1 className="text-xl font-semibold">{__('Inquiries')}</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {__('Total: :count').replace(
                            ':count',
                            String(inquiries.length),
                        )}
                    </p>
                </div>
                <div className="overflow-x-auto rounded-xl border">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b bg-muted/50 text-muted-foreground">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-4 py-3 font-medium"
                                >
                                    {__('Name')}
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 font-medium"
                                >
                                    {__('Email')}
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 font-medium"
                                >
                                    {__('Project details')}
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 font-medium"
                                >
                                    {__('Received at')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {inquiries.map((inquiry) => (
                                <tr key={inquiry.id} className="align-top">
                                    <td className="min-w-36 px-4 py-4 font-medium">
                                        {inquiry.name}
                                    </td>
                                    <td className="px-4 py-4 break-all">
                                        {inquiry.email}
                                    </td>
                                    <td className="min-w-72 px-4 py-4 break-words whitespace-pre-wrap">
                                        {inquiry.projectDetails}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-muted-foreground">
                                        {dateFormat.format(
                                            new Date(inquiry.receivedAt),
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {inquiries.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-4 py-12 text-center text-muted-foreground"
                                    >
                                        {__('No inquiries yet.')}
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
