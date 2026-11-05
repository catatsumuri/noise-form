import ArticleEdit from './edit';

export default function ArticleCreate({ timezone }: { timezone: string }) {
    return (
        <ArticleEdit
            creating
            timezone={timezone}
            article={{
                id: 0,
                title: '',
                slug: '',
                description: '',
                category: '',
                body: [],
                imagePath: null,
                imageAlt: null,
                publishedAtInput: null,
                status: 'Draft',
            }}
        />
    );
}
