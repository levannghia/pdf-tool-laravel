<?php

namespace App\Jobs;

use App\Models\User;
use App\Traits\Progressable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SplitPdf implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, Progressable;

    private string $folderPath = '/download/split/';

    /**
     * Create a new job instance.
     */
    public function __construct(public ?User $user, public string $token, public array $files, public array $attributes)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->startProgress();
        try {
            //code...
            $this->finishProgress();
        } catch (\Exception $e) {
            $this->failedProgress($e->getMessage());
        }
    }
}
