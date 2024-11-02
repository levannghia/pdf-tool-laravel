<?php

namespace App\Http\Controllers;

use App\Jobs\RotatePdf;
use App\Providers\RouteServiceProvider;
use App\Services\UploadService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RotatePdfController extends Controller
{
    public function __construct(private UploadService $uploadService)
    {
        
    }

    public function index() {
        try {
            return Inertia::render('rotate-pdf/Index');
        } catch (\Exception $e) {
            return back()->with(['error_msg', $e->getMessage()]);
        }
    }

    public function store(Request $request) {
        try {
            $token = $request->token;
            $files = $this->uploadService->handle(
                token: $token,
                files: $request->file('files'),
                directory: 'download/rotated',
                service: RouteServiceProvider::ROTATE_PDF
            );

            dispatch(new RotatePdf(
                user: auth()->user(),
                token: $token,
                files: $files,
                attributes: $request->only('rotation')
            ));
            return to_route(RouteServiceProvider::ROTATE_PDF, compact('token'));
        } catch (\Exception $e) {
            return back()->with(['error_msg' => $e->getMessage()]);
        }
    }
}
