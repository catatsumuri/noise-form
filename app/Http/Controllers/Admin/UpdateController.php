<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Update;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class UpdateController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/updates/index', [
            'locale' => app()->getLocale(),
            'timezone' => config('app.timezone'),
            'articles' => Update::query()
                ->orderByDesc('id')
                ->get(['id', 'slug', 'title', 'category', 'published_at'])
                ->map(fn (Update $update) => [
                    'id' => $update->id,
                    'title' => $update->title,
                    'url' => route('admin.updates.show', $update),
                    'category' => $update->category,
                    'publishedAt' => $update->published_at?->toIso8601String(),
                    'status' => $update->published_at === null
                        ? 'Draft'
                        : ($update->published_at->isFuture() ? 'Scheduled' : 'Published'),
                ]),
        ]);
    }

    public function show(Update $update): Response
    {
        return $this->articleResponse($update, 'admin/updates/show');
    }

    public function edit(Update $update): Response
    {
        return $this->articleResponse($update, 'admin/updates/edit');
    }

    private function articleResponse(Update $update, string $component): Response
    {
        return Inertia::render($component, [
            'saved' => session('article_saved', false),
            'locale' => app()->getLocale(),
            'timezone' => config('app.timezone'),
            'article' => [
                'id' => $update->id,
                'title' => $update->title,
                'slug' => $update->slug,
                'description' => $update->description,
                'category' => $update->category,
                'body' => $update->body,
                'imagePath' => $update->image_path,
                'imageAlt' => $update->image_alt,
                'publishedAt' => $update->published_at?->toIso8601String(),
                'publishedAtInput' => $update->published_at?->timezone(config('app.timezone'))->format('Y-m-d\TH:i:s'),
                'status' => $update->published_at === null
                    ? 'Draft'
                    : ($update->published_at->isFuture() ? 'Scheduled' : 'Published'),
            ],
        ]);
    }

    public function update(Request $request, Update $update): RedirectResponse
    {
        $update->forceFill($this->validatedArticle($request, $update))->save();

        return to_route('admin.updates.show', $update)->with('article_saved', true);
    }

    public function create(): Response
    {
        return Inertia::render('admin/updates/create', ['timezone' => config('app.timezone')]);
    }

    public function store(Request $request): RedirectResponse
    {
        $update = new Update;
        $update->forceFill([
            ...$this->validatedArticle($request),
            'user_id' => $request->user()->id,
        ])->save();

        return to_route('admin.updates.show', $update)->with('article_saved', true);
    }

    public function destroy(Update $update): RedirectResponse
    {
        $update->delete();

        return to_route('admin.updates.index');
    }

    /** @return array<string, mixed> */
    private function validatedArticle(Request $request, ?Update $update = null): array
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/', Rule::unique('updates', 'slug')->ignore($update?->id)],
            'description' => ['required', 'string', 'max:10000'],
            'category' => ['required', 'string', 'max:255', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/'],
            'body_text' => ['required', 'string', 'max:100000'],
            'published_at' => ['nullable', 'date_format:Y-m-d\TH:i,Y-m-d\TH:i:s'],
        ]);

        $body = preg_split('/\R\s*\R/u', trim($validated['body_text']), flags: PREG_SPLIT_NO_EMPTY);
        unset($validated['body_text']);

        return [
            ...$validated,
            'body' => array_map(trim(...), $body ?: []),
        ];
    }
}
