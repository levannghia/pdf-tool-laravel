<?php

namespace App\Jobs;

use App\Models\User;
use App\Traits\Progressable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class MergePdf implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, Progressable;

    /**
     * Create a new job instance.
     */
    public function __construct(public ?User $user, public string $token, public array $files)
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
            foreach ($this->files as $key => $file) {
                sleep(2);
                $this->updateProgress(count($this->files), $key + 1);
            }
            $this->finishProgress();
        } catch (\Exception $e) {
            //throw $th;
            $this->failedProgress($e->getMessage());
        }
    }
}
