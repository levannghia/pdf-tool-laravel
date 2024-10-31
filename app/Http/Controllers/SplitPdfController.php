<?php

namespace App\Http\Controllers;

use App\Jobs\SplitPdf;
use App\Providers\RouteServiceProvider;
use App\Services\UploadService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SplitPdfController extends Controller
{
    public function __construct(private UploadService $uploadService)
    {
        
    }

    public function index() {
        try {
            return Inertia::render('split-pdf/Index');
        } catch (\Exception $e) {
            return back()->with([
                'error_msg' => $e->getMessage()
            ]);
        }
    }

    public function store(Request $request) {
        try {
            $token = $request->token;
            $files = $this->uploadService->handle(
                token: $token,
                files: $request->file('files'),
                directory: 'download/split',
                service: RouteServiceProvider::SPLIT_PDF
            );

            dispatch(new SplitPdf(
                user: auth()->user(),
                token: $token,
                files: $files,
                attributes: $request->only('pages')
            ));

            return to_route(RouteServiceProvider::SPLIT_PDF, compact('token'));
            
        } catch (\Exception $e) {
            return back()->with([
                'error_msg' => $e->getMessage()
            ]);
        }
    }
}
