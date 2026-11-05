<?php

namespace App\Http\Controllers;

use App\Models\Update;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class UpdateController extends Controller
{
    public function show(string $slug): Response
    {
        $update = Update::query()->published()->where('slug', $slug)->firstOrFail();

        return Inertia::render('updates/show', [
            'article' => [
                'slug' => $update->slug,
                'title' => $update->title,
                'description' => $update->description,
                'type' => Str::ucfirst(str_replace('-', ' ', $update->category)),
                'date' => $update->published_at?->format('m.Y'),
                'image' => $update->image_path ? asset($update->image_path) : null,
                'imageAlt' => $update->image_alt,
                'paragraphs' => $update->body,
            ],
        ]);
    }
}
