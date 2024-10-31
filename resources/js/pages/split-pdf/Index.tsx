import Warapper from '@/components/Warapper'
import useFilePreview from '@/hook/use-file-preview'
import AppLayout from '@/layouts/AppLayout'
import { useFileStore } from '@/store/use-file-store'
import { Upload } from '@/types/upload'
import { useForm } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { v4 as uuid } from "uuid";
import Sidebar from '@/components/Sidebar'
import FileInput from '@/components/uploads/FileInput'
import DragFileOverlay from '@/components/uploads/DragFileOverlay'
import Uploading from '@/components/uploads/Uploading'
import Processing from '@/components/uploads/Processing'
import Hero from '@/components/merge-pdf/Hero'
import SplitOptions from '@/components/split-pdf/SplitOptions'
import PdfThumbnailRange from '@/components/uploads/PdfThumbnailRange'

function Index() {
    const { data, setData, post, processing } = useForm<Upload & { pages: string }>({
        files: null,
        token: uuid(),
        pages: "all"
    })
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);
    const { files, onDrag, setOnDrag } = useFileStore(useShallow((state) => ({
        files: state.files,
        onDrag: state.onDrag,
        setOnDrag: state.setOnDrag
    })));

    const { handleOnDrop, onSelectFile } = useFilePreview({ multiple: true, type: 'pdf' })

    const submit: React.FormEventHandler = (e) => {
        e.preventDefault();
        post(route("split_pdf.store"), {
            onSuccess: () => setRecentlySuccessful(true),
        });
    };

    useEffect(() => {
        setData('files', files);
    }, [files])

    // console.log(data);

    return (
        <AppLayout title='Split PDF File'>
            <Warapper
                tabIndex={0}
                onDragEnter={() => setOnDrag(true)}
                onDragExit={() => setOnDrag(false)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleOnDrop}
                className='!h-[calc(100vh_-_128px)]'
            >
                {files.length === 0 && (
                    <Hero
                        title="Split PDF files"
                        description="Separate one page or a whole set for easy conversion into independent PDF files."
                        btn={{ title: "Select PDF file", className: "btn btn-red" }}
                        dropLabel="or drop PDF here"
                    />
                )}
                <FileInput
                    onSelectFile={onSelectFile}
                    multiple={false}
                    accept="application/pdf"
                />

                <PdfThumbnailRange file={files[0]} data={data} />

                <DragFileOverlay onDrag={onDrag} />
                {processing && <Uploading token={data.token} />}
                {recentlySuccessful && (
                    <Processing
                        title="Splitting PDF..."
                        token={data.token}
                        setRecentlySuccessful={setRecentlySuccessful}
                    />
                )}
            </Warapper>
            <Sidebar
                title="Split PDF"
                btn={{
                    title: "Split PDF",
                    className: "btn btn-red",
                    disabled: !data.pages || data.pages === "empty",
                    onSubmit: submit,
                }}
            >
                <SplitOptions data={data} setData={setData}/>
            </Sidebar>
        </AppLayout>
    )
}

export default Index