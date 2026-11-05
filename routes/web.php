<?php

use App\Http\Controllers\Admin\InquiryController as AdminInquiryController;
use App\Http\Controllers\Admin\UpdateController as AdminUpdateController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\UpdateController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::post('/inquiries', [InquiryController::class, 'store'])
    ->middleware('throttle:5,1')
    ->name('inquiries.store');

Route::get('/updates/{slug}', [UpdateController::class, 'show'])->name('updates.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('/admin/updates', [AdminUpdateController::class, 'index'])->name('admin.updates.index');
    Route::get('/admin/updates/create', [AdminUpdateController::class, 'create'])->name('admin.updates.create');
    Route::post('/admin/updates', [AdminUpdateController::class, 'store'])->name('admin.updates.store');
    Route::get('/admin/updates/{update}', [AdminUpdateController::class, 'show'])->name('admin.updates.show');
    Route::get('/admin/updates/{update}/edit', [AdminUpdateController::class, 'edit'])->name('admin.updates.edit');
    Route::patch('/admin/updates/{update}', [AdminUpdateController::class, 'update'])->name('admin.updates.update');
    Route::delete('/admin/updates/{update}', [AdminUpdateController::class, 'destroy'])->name('admin.updates.destroy');
    Route::get('/admin/inquiries', [AdminInquiryController::class, 'index'])->name('admin.inquiries.index');
});

require __DIR__.'/settings.php';
