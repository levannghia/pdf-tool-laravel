<?php

use App\Http\Controllers\DownloadFileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\JpgToPdfController;
use App\Http\Controllers\MergePdfController;
use App\Http\Controllers\PdfToJpgController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SplitPdfController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index']);

Route::get('/merge-pdf', [MergePdfController::class, 'index'])->name('merge_pdf');
Route::post('/merge-pdf', [MergePdfController::class, 'store'])->name('merge_pdf.store');
Route::get('/split-pdf', [SplitPdfController::class, 'index'])->name('split_pdf');
Route::post('/split-pdf', [SplitPdfController::class, 'store'])->name('split_pdf.store');
Route::get('/pdf-to-jpg', [PdfToJpgController::class, 'index'])->name('pdf_to_jpg');
Route::post('/pdf-to-jpg', [PdfToJpgController::class, 'store'])->name('pdf_to_jpg.store');
Route::get('/jpg-to-pdf', [JpgToPdfController::class, 'index'])->name('jpg_to_pdf');
Route::post('/jpg-to-pdf', [JpgToPdfController::class, 'store'])->name('jpg_to_pdf.store');
Route::get('/rotate-pdf', fn () => 'merge_pdf')->name('rotate_pdf');
Route::post('/rotate-pdf', fn () => 'merge_pdf')->name('rotate_pdf.store');
Route::get('/compress-pdf', fn () => 'merge_pdf')->name('compress_pdf');
Route::post('/compress-pdf', fn () => 'merge_pdf')->name('compress_pdf.store');
Route::get('/word-to-pdf', fn () => 'merge_pdf')->name('word_to_pdf');
Route::post('/word-to-pdf', fn () => 'merge_pdf')->name('word_to_pdf.store');
Route::get('/powerpoint-to-pdf', fn () => 'merge_pdf')->name('powerpoint_to_pdf');
Route::post('/powerpoint-to-pdf', fn () => 'merge_pdf')->name('powerpoint_to_pdf.store');

Route::get('/download/{token}', [DownloadFileController::class, 'index'])->name('download_file');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
