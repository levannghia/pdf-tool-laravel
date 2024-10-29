import { calculatePercentage, formatFileSize } from '@/utils';
import Echo from 'laravel-echo';
import React, { useEffect, useState } from 'react'

type CurrentFile = {
    file_name: string;
    file_size: number;
}

type UploadProcessingResponse = {
    data: {
        processing: number;
        total: number;
        file: CurrentFile;
    };
};

function Uploading({ token }: { token: string }) {
    const [processing, setProcessing] = useState<number>(0);
    const [total, setTotal] = useState<number>();
    const [percentage, setPercentage] = useState(0);
    const [currentFile, setCurrentFile] = useState<CurrentFile>();

    useEffect(() => {
        window.Echo.channel(`upload-processing-${token}`)
            .listen('.upload-processing', (data: UploadProcessingResponse) => {
                console.log(data);

                const { processing, total, file } = data.data;
                setProcessing(processing);
                setTotal(total);
                setPercentage(calculatePercentage(total, processing));
                setCurrentFile(file);
            });
    }, [])

    return (
        <div
            className='fixed inset-x-0 bottom-0 top-16 z-10 flex flex-col items-center justify-center gap-2 bg-background p-4'
        >
            {processing && currentFile ? (
                <>
                    <h5 className='text-2xl text-foreground/80'>
                        Upload file {processing} of {total}
                    </h5>
                    <p className='text-lg'>
                        {currentFile.file_name} ({formatFileSize(currentFile.file_size)})
                    </p>
                </>
            ) : (
                <h5 className="text-2xl text-foreground/80">Loading...</h5>
            )}
            <div className='relative my-4 h-3 w-full max-w-lg overflow-hidden rounded-full'>
                <div className='absolute h-full w-full bg-gray-200 dark:bg-gray-500/25' />
                <div className='bg-red h-full relative transition-all duration-100' style={{ width: percentage + "%" }} />
            </div>
            <h5 className='text-4xl font-bold text-foreground'>{percentage}%</h5>
            <p className='text-lg'>Uploaded</p>
        </div>
    )
}

export default Uploading