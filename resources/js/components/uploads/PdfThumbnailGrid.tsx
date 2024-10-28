import { Preview } from '@/types/upload'
import React from 'react'
import ThumbnailWrapper from './ThumbnailWrapper'
import { formatFileSize } from '@/utils'
import { BsPlusLg, BsXLg } from "react-icons/bs";
import PdfThumbnail from './PdfThumbnail';
import clsx from 'clsx';

type PdfThumbnailGridProps = {
    files: Preview[],
    deleteFile: (file: Preview) => void,
    className?: string,
    rotateStyle?: {
        [key: string]: string;
    };
}

function PdfThumbnailGrid({ files, deleteFile, className, rotateStyle }: PdfThumbnailGridProps) {
    return (
        files.length > 0 && (
            <div className='relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7'>
                {files.map((file, index) => (
                    <ThumbnailWrapper key={index}>
                        <div className="my-auto flex" style={rotateStyle}>
                            <PdfThumbnail file={file} pageIndex={() => 0} />
                        </div>

                        <div className="mt-auto w-full overflow-hidden">
                            <h5 className="truncate text-sm">{file.name}</h5>
                            <p className="text-xs text-secondary-foreground">
                                {formatFileSize(file.size)}
                            </p>
                        </div>

                        <button
                            className="btn btn-red absolute right-2 top-2 rounded-full px-2 opacity-0 transition-all group-hover:opacity-100"
                            onClick={() => deleteFile(file)}
                        >
                            <BsXLg />
                        </button>
                    </ThumbnailWrapper>
                ))}

                <ThumbnailWrapper className="hover:!scale-100">
                    <label
                        htmlFor="files"
                        tabIndex={1}
                        className={clsx(
                            "btn cursor-pointer rounded-full px-2 text-white shadow",
                            className,
                        )}
                    >
                        <BsPlusLg className="text-4xl" />
                    </label>
                </ThumbnailWrapper>
            </div>
        )
    )
}

export default PdfThumbnailGrid