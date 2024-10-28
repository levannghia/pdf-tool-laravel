import { useFileStore } from '@/store/user-file-store';
import { Preview } from '@/types/upload';
import { isImageFile, isPowerpointFile, isWordFile } from '@/utils';
import { isPdfFile } from 'pdfjs-dist';
import React, { useCallback } from 'react'
import { v4 as uuid } from 'uuid'
import { useShallow } from 'zustand/react/shallow';

type FilePreviewProps = {
    multiple?: boolean;
    type: "pdf" | "image" | "word" | "powerpoint";
};

export default function useFilePreview({ multiple, type }: FilePreviewProps) {
    const { files, setFiles, setOnDrag, setErrors } = useFileStore(
        useShallow((state) => ({
            files: state.files,
            setFiles: state.setFiles,
            setOnDrag: state.setOnDrag,
            setErrors: state.setErrors,
        })),
    );

    const onSelectOrDropFiles = useCallback((newFiles: FileList | null) => {
        if (!newFiles) return

        const tempErrors: string[] = [];
        const droppedFiles = Array.from(newFiles).filter(({ name }) => {
            if (
                type === "pdf" && !isPdfFile(name) ||
                type === 'image' && !isImageFile(name) ||
                type === 'word' && !isWordFile(name) ||
                type === 'powerpoint' && !isPowerpointFile(name)
            ) {
                tempErrors.push(`Sorry, ${name} not allowed.`);
                return;
            }

            return true
        })
            .map((file) => Object.assign(file, {
                preview: isWordFile(file.name) ? '/image/microsoft-word.svg?' + uuid() :
                    isPowerpointFile(file.name) ? '/image/microsoft-powerpoint.svg?' + uuid() : URL.createObjectURL(file),
            }))

        const updatedFiles = multiple
            ? [...files, ...droppedFiles]
            : droppedFiles;

        setFiles(updatedFiles);
        setErrors(tempErrors);
    }, [files]);

    // onSelectFile 
    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSelectOrDropFiles(e.target.files);
    }

    const deleteFile = (file: Preview) => {
        const updatedFiles = multiple
            ? files.filter((f) => f.preview !== file.preview)
            : [];

        setFiles(updatedFiles);
    };

    const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files;
        if (files.length === 0) {
            return setOnDrag(false);
        }

        onSelectOrDropFiles(files);
        setOnDrag(false);
    };

    return {
        onSelectFile,
        deleteFile,
        handleOnDrop,
    }
}
