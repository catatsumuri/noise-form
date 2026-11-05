<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class InquiryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/inquiries/index', [
            'inquiries' => DB::table('inquiries')
                ->orderByDesc('created_at')
                ->orderByDesc('id')
                ->get(['id', 'name', 'email', 'project_details', 'created_at'])
                ->map(fn (object $inquiry) => [
                    'id' => $inquiry->id,
                    'name' => $inquiry->name,
                    'email' => $inquiry->email,
                    'projectDetails' => $inquiry->project_details,
                    'receivedAt' => Carbon::parse($inquiry->created_at)->toIso8601String(),
                ]),
            'locale' => app()->getLocale(),
            'timezone' => config('app.timezone'),
        ]);
    }
}
