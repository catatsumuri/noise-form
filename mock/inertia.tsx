// Preview-only stand-ins. The original welcome.tsx is never modified.
import { useEffect, type AnchorHTMLAttributes, type ReactNode } from 'react';

export function Head({ title }: { title?: string }) {
    useEffect(() => {
        if (title) document.title = title;
    }, [title]);
    return null;
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    href: string;
    prefetch?: boolean;
};

export function Link({ href, children, prefetch: _prefetch, ...props }: LinkProps) {
    return <a href={href} {...props}>{children}</a>;
}

export function usePage() {
    return {
        props: {
            auth: {
                user: null as null | { name: string },
            },
        },
    };
}
