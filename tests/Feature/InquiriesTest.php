<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class InquiriesTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_can_submit_an_inquiry_and_see_confirmation_once(): void
    {
        $this->withoutVite();

        $inquiry = ['name' => ' Test Person ', 'email' => 'hello@example.com', 'project_details' => 'A new website.'];

        $this->post('/inquiries', [...$inquiry, 'unexpected' => 'ignored'])
            ->assertRedirect('/#contact')
            ->assertSessionHas('inquiry_sent', true);

        $this->assertDatabaseHas('inquiries', [...$inquiry, 'name' => 'Test Person']);
        $this->assertDatabaseCount('inquiries', 1);
        $this->get('/')->assertInertia(fn (Assert $page) => $page->where('inquirySent', true));
        $this->get('/')->assertInertia(fn (Assert $page) => $page->where('inquirySent', false));
    }

    public function test_blank_invalid_and_oversized_fields_are_not_saved(): void
    {
        foreach ([
            ['name' => ' ', 'email' => '', 'project_details' => ' '],
            ['name' => str_repeat('a', 256), 'email' => 'invalid', 'project_details' => str_repeat('a', 10001)],
        ] as $inquiry) {
            $this->from('/')->post('/inquiries', $inquiry)
                ->assertRedirect('/')
                ->assertSessionHasErrors(['name', 'email', 'project_details']);
        }

        $this->assertDatabaseCount('inquiries', 0);
    }

    public function test_submissions_are_rate_limited(): void
    {
        $inquiry = ['name' => 'Test Person', 'email' => 'hello@example.com', 'project_details' => 'A new website.'];

        for ($attempt = 0; $attempt < 5; $attempt++) {
            $this->post('/inquiries', $inquiry)->assertRedirect('/#contact');
        }

        $this->post('/inquiries', $inquiry)->assertTooManyRequests();
        $this->assertDatabaseCount('inquiries', 5);
    }
}
