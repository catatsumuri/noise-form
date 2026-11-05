<?php

namespace Tests\Feature;

use App\Models\Update;
use App\Models\User;
use Database\Seeders\UpdateSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminUpdatesTest extends TestCase
{
    use RefreshDatabase;

    public function test_verified_users_can_create_and_delete_articles(): void
    {
        $this->withoutVite();
        $user = User::factory()->create();
        $payload = ['title' => 'New article', 'slug' => 'new-article', 'description' => 'Summary',
            'category' => 'studio-note', 'body_text' => "First.\n\nSecond.", 'published_at' => '',
            'user_id' => 9999, 'image_path' => 'ignored.jpg'];

        $this->get('/admin/updates/create')->assertRedirect('/login');
        $this->post('/admin/updates', $payload)->assertRedirect('/login');
        $this->actingAs(User::factory()->unverified()->create())
            ->post('/admin/updates', $payload)->assertRedirect(route('verification.notice'));
        $this->actingAs($user)->get('/admin/updates/create')->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('admin/updates/create'));
        $this->post('/admin/updates', $payload)->assertSessionHasNoErrors();
        $article = Update::query()->firstOrFail();
        $this->assertSame($user->id, $article->user_id);
        $this->assertSame(['First.', 'Second.'], $article->body);
        $this->assertNull($article->image_path);
        $this->assertNull($article->published_at);
        $this->post('/admin/updates', $payload)->assertSessionHasErrors('slug');
        $this->assertDatabaseCount('updates', 1);

        $this->actingAs(User::factory()->unverified()->create())
            ->delete(route('admin.updates.destroy', $article))->assertRedirect(route('verification.notice'));
        $this->assertDatabaseCount('updates', 1);
        $this->actingAs($user)->delete(route('admin.updates.destroy', $article))
            ->assertRedirect(route('admin.updates.index'));
        $this->assertDatabaseCount('updates', 0);
        $this->get(route('admin.updates.show', $article))->assertNotFound();
    }

    public function test_edit_form_is_separate_from_details_and_requires_verification(): void
    {
        $this->withoutVite();
        $this->seed(UpdateSeeder::class);
        $article = Update::query()->firstOrFail();
        $url = route('admin.updates.edit', $article);
        $this->get($url)->assertRedirect('/login');
        $this->actingAs(User::factory()->unverified()->create())
            ->get($url)->assertRedirect(route('verification.notice'));
        $this->actingAs(User::factory()->create())->get($url)->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('admin/updates/edit')
                ->where('article.id', $article->id)
                ->where('article.body', $article->body));
    }

    public function test_editing_saves_content_and_preserves_image_fields(): void
    {
        $this->seed(UpdateSeeder::class);
        $article = Update::query()->firstOrFail();
        $payload = [
            'title' => 'Updated title', 'slug' => 'updated-slug',
            'description' => 'Updated description', 'category' => 'studio-note',
            'body_text' => "First paragraph.\n\nSecond paragraph.",
            'published_at' => '2027-01-15T12:30:00',
            'image_path' => 'unwanted.jpg', 'image_alt' => 'unwanted',
        ];
        $url = route('admin.updates.update', $article);
        $this->patch($url, $payload)->assertRedirect('/login');
        $this->actingAs(User::factory()->unverified()->create())
            ->patch($url, $payload)->assertRedirect(route('verification.notice'));
        $this->actingAs(User::factory()->create())->patch($url, $payload)
            ->assertRedirect(route('admin.updates.show', $article));

        $saved = $article->fresh();
        $this->assertSame('Updated title', $saved->title);
        $this->assertSame('updated-slug', $saved->slug);
        $this->assertSame(['First paragraph.', 'Second paragraph.'], $saved->body);
        $this->assertSame($article->image_path, $saved->image_path);
        $this->assertSame($article->image_alt, $saved->image_alt);
        $this->assertSame('2027-01-15 12:30:00', $saved->published_at->format('Y-m-d H:i:s'));

        $this->patch($url, [...$payload, 'published_at' => '2027-01-15T12:30'])->assertSessionHasNoErrors();
        $this->assertSame('2027-01-15 12:30:00', $article->fresh()->published_at->format('Y-m-d H:i:s'));

        $this->patch($url, [...$payload, 'published_at' => ''])->assertSessionHasNoErrors();
        $this->assertNull($article->fresh()->published_at);
    }

    public function test_invalid_edits_do_not_change_an_article(): void
    {
        $this->seed(UpdateSeeder::class);
        $articles = Update::query()->get();
        $article = $articles[0];
        $this->actingAs(User::factory()->create())
            ->patch(route('admin.updates.update', $article), [
                'title' => '', 'slug' => $articles[1]->slug,
                'description' => '', 'category' => 'invalid/category',
                'body_text' => ' ', 'published_at' => 'invalid',
            ])->assertSessionHasErrors(['title', 'slug', 'description', 'category', 'body_text', 'published_at']);
        $this->assertSame($article->getAttributes(), $article->fresh()->getAttributes());
    }

    public function test_guests_and_unverified_users_cannot_view_the_list(): void
    {
        $this->get('/admin/updates')->assertRedirect('/login');
        $this->actingAs(User::factory()->unverified()->create())
            ->get('/admin/updates')->assertRedirect(route('verification.notice'));
    }

    public function test_verified_users_can_list_published_draft_and_scheduled_articles(): void
    {
        $this->withoutVite();
        $this->seed(UpdateSeeder::class);

        $articles = Update::query()->orderByDesc('id')->get();
        $articles[0]->forceFill(['published_at' => null])->save();
        $articles[1]->forceFill(['published_at' => now()->addDay()])->save();
        $articles[2]->forceFill(['published_at' => now()->subDay()])->save();

        $this->actingAs(User::factory()->create())->get('/admin/updates')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('admin/updates/index')
                ->has('articles', 3)
                ->where('articles.0.id', $articles[0]->id)
                ->where('articles.0.title', $articles[0]->title)
                ->where('articles.0.status', 'Draft')
                ->where('articles.0.publishedAt', null)
                ->where('articles.0.url', route('admin.updates.show', $articles[0]))
                ->where('articles.1.status', 'Scheduled')
                ->where('articles.1.url', route('admin.updates.show', $articles[1]))
                ->where('articles.2.status', 'Published')
                ->where('articles.2.url', route('admin.updates.show', $articles[2]))
                ->missing('articles.0.body'));
    }

    public function test_an_empty_list_is_supported(): void
    {
        $this->withoutVite();
        $this->actingAs(User::factory()->create())->get('/admin/updates')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('admin/updates/index')
                ->has('articles', 0));
    }

    public function test_admin_details_include_unpublished_articles_without_exposing_them_publicly(): void
    {
        $this->withoutVite();
        $this->seed(UpdateSeeder::class);
        $article = Update::query()->firstOrFail();
        $article->forceFill(['published_at' => null])->save();
        $url = route('admin.updates.show', $article);

        $this->get($url)->assertRedirect('/login');
        $this->actingAs(User::factory()->unverified()->create())
            ->get($url)->assertRedirect(route('verification.notice'));
        $this->actingAs(User::factory()->create());

        foreach ([null, now()->addDay(), now()->subDay()] as $publishedAt) {
            $article->forceFill(['published_at' => $publishedAt])->save();
            $this->get($url)->assertOk()->assertInertia(fn (Assert $page) => $page
                ->component('admin/updates/show')
                ->where('article.id', $article->id)
                ->where('article.title', $article->title)
                ->where('article.body', $article->body)
                ->where('article.description', $article->description));
        }

        $article->forceFill(['published_at' => null])->save();
        $this->get('/updates/'.$article->slug)->assertNotFound();
        $this->get('/admin/updates/999999')->assertNotFound();
    }
}
