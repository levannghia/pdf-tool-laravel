<?php

namespace App\Http\Controllers;

use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MergePdfController extends Controller
{
    public function index () {
        try {
            return Inertia::render('merge-pdf/Index');
        } catch (\Exception $e) {
            return back()->with([
                'error_msg' => $e->getMessage()
            ]);
        }
    }

    public function store (Request $request) {
        DB::beginTransaction();

        try {
            dd($request->all());
            DB::commit();
            return to_route(RouteServiceProvider::MERGE_PDF, compact('token'));
        } catch (\Exception $e) {
            DB::rollBack();
        }
    }
}
