import { Preview } from '@/types/upload';
import React, { useEffect, useState } from 'react'

type PdfThumbnailRangeProps = {
    file: Preview;
    data: any;
};

function PdfThumbnailRange({ file, data }: PdfThumbnailRangeProps) {
    const [lastPage, setLastPage] = useState<number>(1);
    const [pages, setPages] = useState<string[]>([]);

    useEffect(() => {
        if(lastPage) {
            switch (data.pages) {
                case "all":
                    const allPage = Array.from({length: lastPage + 1}).map((_, index) => String(index + 1));
                    setPages(allPage);
                    break;
                case "empty":
                    setPages([]);
                default:
                    break;
            }
        }
    }, [data,lastPage])

    return (
        <div>PdfThumbnailRange</div>
    )
}

export default PdfThumbnailRange