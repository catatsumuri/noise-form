<?php

namespace Tests\Feature;

use Database\Seeders\UpdateSeeder;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class UpdateSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_seeder_creates_articles_with_an_author_and_preserves_edits_on_rerun(): void
    {
        $this->seed(UpdateSeeder::class);

        $this->assertDatabaseCount('updates', 3);
        $author = DB::table('users')->where('email', 'studio@example.com')->first();
        $article = DB::table('updates')->where('slug', 'new-chapter-in-berlin')->first();

        $this->assertEquals($author->id, $article->user_id);
        $this->assertSame('studio-note', $article->category);
        $this->assertSame('2026-05-01 00:00:00', $article->published_at);
        $this->assertCount(3, json_decode($article->body, true, flags: JSON_THROW_ON_ERROR));
        $this->assertSame('images/noise-form/studio.webp', $article->image_path);

        DB::table('updates')->where('id', $article->id)->update(['title' => 'Edited title']);
        $this->seed(UpdateSeeder::class);

        $this->assertDatabaseCount('updates', 3);
        $this->assertDatabaseCount('users', 1);
        $this->assertDatabaseHas('updates', ['id' => $article->id, 'title' => 'Edited title']);
    }

    public function test_an_author_with_articles_cannot_be_deleted(): void
    {
        $this->seed(UpdateSeeder::class);

        $this->expectException(QueryException::class);

        DB::table('users')->where('email', 'studio@example.com')->delete();
    }
}
