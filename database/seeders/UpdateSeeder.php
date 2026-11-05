<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class UpdateSeeder extends Seeder
{
    public function run(): void
    {
        $author = User::firstOrCreate(
            ['email' => 'studio@example.com'],
            ['name' => 'NOISE / FORM', 'password' => Str::random(64)],
        );

        $articles = File::json(__DIR__.'/data/updates.json', flags: JSON_THROW_ON_ERROR);

        foreach ($articles as $article) {
            // Re-running the seeder preserves any edits to an existing article.
            if (DB::table('updates')->where('slug', $article['slug'])->exists()) {
                continue;
            }

            DB::table('updates')->insert([
                'user_id' => $author->id,
                'slug' => $article['slug'],
                'title' => $article['title'],
                'description' => $article['description'],
                'category' => Str::slug($article['type']),
                'body' => json_encode($article['paragraphs'], JSON_THROW_ON_ERROR),
                'image_path' => ltrim($article['image'], '/'),
                'image_alt' => $article['imageAlt'],
                // The mock specifies a month only; seed its first day at midnight.
                'published_at' => Carbon::createFromFormat('!m.Y', $article['date']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
