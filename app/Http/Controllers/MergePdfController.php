<?php

namespace App\Http\Controllers;

use App\Jobs\MergePdf;
use App\Providers\RouteServiceProvider;
use App\Services\UploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MergePdfController extends Controller
{
    public function __construct(private UploadService $uploadService)
    {
        
    }

    public function index () {
        try {
            return Inertia::render('merge-pdf/Index');
        } catch (\Exception $e) {
            return back()->with([
                'error_msg' => $e->getMessage()
            ]);
        }
    }

    public function store(Request $request) {
        // DB::beginTransaction();

        try {
            $token = $request->token;
            $files = $this->uploadService->handle(
                token: $token,
                files: $request->file('files'),
                directory: 'download/merged',
                service: RouteServiceProvider::MERGE_PDF
            );

            dispatch(new MergePdf(
                user: auth()->user(),
                token: $token,
                files: $files
            ));
            // DB::commit();
            return to_route(RouteServiceProvider::MERGE_PDF, compact('token'));
        } catch (\Exception $e) {
            // DB::rollBack();
            return back()->with([
                'error_msg' => $e->getMessage()
            ]);
        }
    }
}
