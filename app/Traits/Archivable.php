<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use ZipArchive;

trait Archivable
{
    public function archive(array $files, string $directory) {
        try {
            $fileZip = $directory . Str::uuid() . 'zip';
            $zip = new ZipArchive;

            if(true === ($zip->open(Storage::path($fileZip), ZipArchive::CREATE | ZipArchive::OVERWRITE))) {
                foreach ($files as $key => $file) {
                    $zip->addFile(Storage::path($file), $key + 1 . '.' .pathinfo($file, PATHINFO_EXTENSION));
                }

                if($zip->numFiles === 0) {
                    throw new \Exception(("File not found"));
                }

                $zip->close();
            }

            return $fileZip;
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }
}
