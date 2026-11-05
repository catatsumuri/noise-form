<?php

namespace Tests\Feature;

use Database\Seeders\UpdateSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class UpdatesTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_articles_render_their_detail_page(): void
    {
        $this->withoutVite();
        $this->travelTo(now()->setDate(2026, 11, 5));
        $this->seed(UpdateSeeder::class);

        foreach (['new-chapter-in-berlin', 'signal-field-enters-the-world', 'the-feeling-of-digital-matter'] as $slug) {
            $this->get('/updates/'.$slug)
                ->assertOk()
                ->assertInertia(fn (Assert $page) => $page
                    ->component('updates/show')
                    ->where('article.slug', $slug)
                    ->has('article.title')
                    ->has('article.paragraphs', 3));
        }
    }

    public function test_detail_props_reflect_database_edits_and_nullable_images(): void
    {
        $this->withoutVite();
        $this->seed(UpdateSeeder::class);
        DB::table('updates')->where('slug', 'new-chapter-in-berlin')->update([
            'title' => 'Edited in the database',
            'description' => 'Updated description',
            'body' => json_encode(['Updated paragraph'], JSON_THROW_ON_ERROR),
            'category' => 'new-work',
            'published_at' => '2025-01-02 00:00:00',
            'image_path' => null,
            'image_alt' => null,
        ]);

        $this->get('/updates/new-chapter-in-berlin')->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('updates/show')
                ->where('article.title', 'Edited in the database')
                ->where('article.description', 'Updated description')
                ->where('article.paragraphs', ['Updated paragraph'])
                ->where('article.type', 'New work')
                ->where('article.date', '01.2025')
                ->where('article.image', null)
                ->where('article.imageAlt', null)
                ->missing('article.user_id'));
    }

    public function test_draft_and_scheduled_articles_are_not_public(): void
    {
        $this->seed(UpdateSeeder::class);

        foreach ([null, now()->addDay()] as $publishedAt) {
            DB::table('updates')->where('slug', 'new-chapter-in-berlin')
                ->update(['published_at' => $publishedAt]);

            $this->get('/updates/new-chapter-in-berlin')->assertNotFound();
        }
    }

    public function test_unknown_article_returns_not_found(): void
    {
        $this->get('/updates/unknown-article')->assertNotFound();
    }
}
