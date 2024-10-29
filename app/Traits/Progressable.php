<?php

namespace App\Traits;

use App\Events\TaskProcessedSuccessfully;
use App\Events\TaskProcessing;
use App\Events\TaskProcessingFailed;
use App\Models\UploadLogs;

trait Progressable
{
    public function startProgress() {
        event(new TaskProcessing(
            user: $this->user,
            token: $this->token,
            percentage: 0
        ));


    }

    public function updateProgress(int $total, int $processing) {
        if($this->token) {
            event(new TaskProcessing(
                user: $this->user,
                token: $this->token,
                percentage: calculate_percentage($total, $processing)
            ));
        }
    }

    public function finishProgress() {
        UploadLogs::whereToken($this->token)->update([
            'status' => UploadLogs::SUCCESS
        ]);

        event(new TaskProcessedSuccessfully(
            user: $this->user,
            token: this->token,
        ));
    }

    public function failedProgress($message) {
        UploadLogs::whereToken($this->token)->update([
            'status' => UploadLogs::FAILED
        ]);

        event(new TaskProcessingFailed(
            user: $this->user,
            token: this->token,
            message: $message
        ));
    }
}
