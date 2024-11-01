import { Preview } from '@/types/upload';
import React, { useEffect, useState } from 'react'
import ThumbnailWrapper from './ThumbnailWrapper'
import { formatFileSize } from '@/utils'
import { BsCheckLg } from "react-icons/bs";
import PdfThumbnail from './PdfThumbnail';
import clsx from 'clsx';

type PdfThumbnailRangeProps = {
    file: Preview;
    data: any;
};

function PdfThumbnailRange({ file, data }: PdfThumbnailRangeProps) {
    const [lastPage, setLastPage] = useState<number>(1);
    const [pages, setPages] = useState<string[]>([]);

    useEffect(() => {
        if (lastPage) {
            switch (data.pages) {
                case "all":
                    const allPage = Array.from({ length: lastPage + 1 }).map((_, index) => String(index + 1));
                    setPages(allPage);
                    break;
                case "empty":
                    setPages([]);
                default:
                    const selectedPages: string[] = [];
                    String(data.pages).split(",").forEach((range) => {
                        const ranges = range.split('-');
                        const selectedRange: string[] = [];

                        const start = Number(range[0]);
                        const end = Number(ranges[1]);

                        if (ranges.length === 1) {
                            selectedRange.push(start.toString())
                        } else {
                            for (let i = start; i < end + 1; i++) {
                                selectedRange.push(i.toString());
                            }
                        }

                        selectedPages.push(...selectedRange);
                    })
                    setPages(selectedPages);
                    break;
            }
        }

        console.log(lastPage);

    }, [data, lastPage])

    return (
        file && (
            <div className='relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7'>
                <ThumbnailWrapper >
                    <div className="my-auto flex">
                        {pages.includes('1') && (
                            <button className='btn btn-green absolute left-2 top-2 flex rounded-full p-0 transition-all !h-6 !w-6 items-center justify-center'>
                                <BsCheckLg />
                            </button>
                        )}
                        <PdfThumbnail file={file} pageIndex={() => 0} onLoad={(props) => setLastPage(props?.numPages!)!} />

                    </div>

                    <div className="mt-auto w-full overflow-hidden">
                        <h5 className="truncate text-sm">{file.name}</h5>
                        <p className="text-xs text-secondary-foreground">
                            {formatFileSize(file.size)}
                        </p>
                        <p className='text-xs text-secondary-foreground'>(1)</p>
                    </div>
                </ThumbnailWrapper>
                {lastPage !== 1 && Array.from({ length: lastPage - 1 }).map((_, index) => (
                    <ThumbnailWrapper key={`wrapper-${index}`}>
                        <div className="my-auto flex">
                            {pages.includes(`${index + 2}`) && (
                                <button className='btn btn-green absolute left-2 top-2 flex rounded-full p-0 transition-all !h-6 !w-6 items-center justify-center'>
                                    <BsCheckLg />
                                </button>
                            )}
                            <PdfThumbnail file={file} pageIndex={() => index + 1} />

                        </div>

                        <div className="mt-auto w-full overflow-hidden">
                            <h5 className="truncate text-sm">{file.name}</h5>
                            <p className="text-xs text-secondary-foreground">
                                {formatFileSize(file.size)}
                            </p>
                            <p className='text-xs text-secondary-foreground'>({index + 2})</p>
                        </div>
                    </ThumbnailWrapper>
                ))}
            </div>
        )
    )
}

export default PdfThumbnailRange