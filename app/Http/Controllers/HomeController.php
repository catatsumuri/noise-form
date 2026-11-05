<?php

namespace App\Http\Controllers;

use App\Models\Update;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $updates = Update::query()
            ->published()
            ->orderByDesc('published_at')
            ->orderByDesc('id')
            ->get(['slug', 'title', 'description', 'category', 'published_at', 'image_path', 'image_alt'])
            ->map(fn (Update $update) => [
                'slug' => $update->slug,
                'title' => $update->title,
                'description' => $update->description,
                'type' => Str::ucfirst(str_replace('-', ' ', $update->category)),
                'date' => $update->published_at?->format('m.Y'),
                'image' => $update->image_path ? asset($update->image_path) : null,
                'imageAlt' => $update->image_alt,
            ]);

        return Inertia::render('welcome', ['updates' => $updates]);
    }
}
