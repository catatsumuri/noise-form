<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InquirySeeder extends Seeder
{
    public function run(): void
    {
        $inquiries = [
            [
                'name' => 'Emma Clarke',
                'email' => 'emma.clarke@example.com',
                'project_details' => 'We are launching an independent furniture brand and need a visual identity and an e-commerce website. We would love to explore a tactile, editorial direction. Our target launch is March, with an estimated budget of EUR 25,000–35,000.',
            ],
            [
                'name' => 'Oliver Bennett',
                'email' => 'oliver.bennett@example.com',
                'project_details' => 'Our gallery is planning an exhibition about urban soundscapes. We are looking for a studio to create an interactive installation that responds to visitors and ambient audio. Could we arrange an introductory call next week?',
            ],
            [
                'name' => 'Sofia Martinez',
                'email' => 'sofia.martinez@example.com',
                'project_details' => "Hello! We are a small music festival looking for a generative visual system for our next edition. Deliverables would include a website, animated posters, and stage visuals.\n\nWe have an initial creative brief ready and would be happy to share it. The festival takes place in June.",
            ],
            [
                'name' => 'James Wilson',
                'email' => 'james.wilson@example.com',
                'project_details' => 'We enjoyed your Signal Field project. Our architecture practice is interested in a WebGL experience to present an upcoming cultural center. We are still defining the scope and would appreciate a conversation about technical feasibility and possible approaches.',
            ],
            [
                'name' => 'Mia Andersen',
                'email' => 'mia.andersen@example.com',
                'project_details' => 'Do you work with early-stage teams? We are developing a sustainable materials platform and need help turning our research into a clear digital story. We would like to start with a short discovery workshop before committing to a full website.',
            ],
        ];

        foreach ($inquiries as $index => $inquiry) {
            // Keep existing submissions intact when this seeder is run again.
            if (DB::table('inquiries')->where('email', $inquiry['email'])->exists()) {
                continue;
            }

            $receivedAt = now()->subDays(count($inquiries) - $index)->subHours($index);

            DB::table('inquiries')->insert([
                ...$inquiry,
                'created_at' => $receivedAt,
                'updated_at' => $receivedAt,
            ]);
        }
    }
}
