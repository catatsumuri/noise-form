<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\InquirySeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminInquiriesTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_and_unverified_users_cannot_view_inquiries(): void
    {
        $this->get('/admin/inquiries')->assertRedirect('/login');
        $this->actingAs(User::factory()->unverified()->create())
            ->get('/admin/inquiries')->assertRedirect(route('verification.notice'));
    }

    public function test_verified_users_can_view_inquiries_newest_first(): void
    {
        $this->withoutVite();
        $this->seed(InquirySeeder::class);
        $newest = DB::table('inquiries')->orderByDesc('created_at')->first();

        $this->actingAs(User::factory()->create())->get('/admin/inquiries')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('admin/inquiries/index')
                ->has('inquiries', 5)
                ->where('inquiries.0.id', $newest->id)
                ->where('inquiries.0.name', $newest->name)
                ->where('inquiries.0.email', $newest->email)
                ->where('inquiries.0.projectDetails', $newest->project_details)
                ->has('inquiries.0.receivedAt'));
    }

    public function test_an_empty_list_is_supported(): void
    {
        $this->withoutVite();
        $this->actingAs(User::factory()->create())->get('/admin/inquiries')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('admin/inquiries/index')
                ->has('inquiries', 0));
    }
}
