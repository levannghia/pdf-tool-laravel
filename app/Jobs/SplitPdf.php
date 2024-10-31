<?php

namespace App\Jobs;

use App\Models\User;
use App\Traits\Progressable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use setasign\Fpdi\Fpdi;

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
            $archivedFiles = [];
            foreach ($this->files as $key => $file) {
                $pdfInstance = new Fpdi();
                $pageCount = $pdfInstance->setSourceFile(Storage::path($file));

                for ($pageNo=1; $pageNo <= $pageCount; $pageNo++) { 
                    $pages = $this->attributes['pages'];
                    $selectedPages = [];

                    if($pages == 'all') {
                        $selectedPages = range(1, $pageCount);
                    }
                }
            }
            $this->finishProgress();
        } catch (\Exception $e) {
            array_map(fn ($file) => remove_file($file), $this->files);
            $this->failedProgress($e->getMessage());
        }
    }
}
