<?php

namespace Tests\Feature;

use Database\Seeders\UpdateSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class HomeUpdatesTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_lists_all_published_articles_newest_first(): void
    {
        $this->withoutVite();
        $this->travelTo(now()->setDate(2026, 11, 5));
        $this->seed(UpdateSeeder::class);

        $article = (array) DB::table('updates')->first();
        unset($article['id']);

        foreach (['draft' => null, 'scheduled' => now()->addDay(), 'new-entry' => now()] as $slug => $publishedAt) {
            DB::table('updates')->insert([
                ...$article,
                'slug' => $slug,
                'title' => 'Article from database',
                'published_at' => $publishedAt,
            ]);
        }

        $this->get(route('home'))->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('welcome')
                ->has('updates', 4)
                ->where('updates.0.slug', 'new-entry')
                ->where('updates.0.title', 'Article from database')
                ->where('updates.1.slug', 'new-chapter-in-berlin')
                ->where('updates.1.date', '05.2026')
                ->where('updates.1.type', 'Studio note')
                ->where('updates.1.image', asset('images/noise-form/studio.webp'))
                ->where('updates.1.imageAlt', 'An airy creative studio workspace in afternoon sunlight')
                ->where('updates.2.slug', 'signal-field-enters-the-world')
                ->where('updates.3.slug', 'the-feeling-of-digital-matter')
                ->missing('updates.0.body')
                ->missing('updates.0.user_id'));
    }

    public function test_home_renders_without_articles(): void
    {
        $this->withoutVite();

        $this->get(route('home'))->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('welcome')
                ->has('updates', 0));
    }
}
