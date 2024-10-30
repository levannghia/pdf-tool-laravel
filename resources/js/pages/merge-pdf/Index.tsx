import Warapper from '@/components/Warapper'
import Hero from '@/components/merge-pdf/Hero'
import DragFileOverlay from '@/components/uploads/DragFileOverlay'
import FileInput from '@/components/uploads/FileInput'
import AppLayout from '@/layouts/AppLayout'
import { useFileStore } from '@/store/use-file-store'
import { v4 as uuid } from 'uuid'
import React, { useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Upload } from '@/types/upload';
import { useForm } from '@inertiajs/react'
import useFilePreview from '@/hook/use-file-preview'
import PdfThumbnailGrid from '@/components/uploads/PdfThumbnailGrid'
import Sidebar from '@/components/Sidebar'
import Uploading from '@/components/uploads/Uploading'
import Processing from '@/components/uploads/Processing'

function Index() {
  const { data, setData, post, processing } = useForm<Upload>({
    files: null,
    token: uuid()
  })

  const [recentlySuccessful, setRecentlySuccessful] = useState(false);

  const { files, onDrag, setOnDrag } = useFileStore(useShallow((state) => ({
    files: state.files,
    onDrag: state.onDrag,
    setOnDrag: state.setOnDrag
  })))

  const { onSelectFile, handleOnDrop, deleteFile } = useFilePreview({
    multiple: true,
    type: "pdf",
  });

  useEffect(() => {
    setData("files", files);
    // console.log(files);
  }, [files]);

  useEffect(() => {

  }, [processing])

  const submit: React.FormEventHandler = (e) => {
    e.preventDefault();

    post(route("merge_pdf.store"), {
      onSuccess: () => setRecentlySuccessful(true),
    });
  };

  return (
    <AppLayout title='Merge PDF Files'>
      <Warapper
        onDragEnter={() => setOnDrag(true)}
        onDragExit={() => setOnDrag(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleOnDrop}
      >
        <Hero
          title='Merge PDF Files'
          description="Combine PDFs in the order you want with the easiest PDF merger available."
          btn={{ title: "Select PDF files", className: "btn btn-sky" }}
          dropLabel="or drop PDFs here"
        />
        <FileInput
          onSelectFile={onSelectFile}
          multiple={true}
          accept='application/pdf'
        />
        <PdfThumbnailGrid files={files} deleteFile={deleteFile} className="btn btn-sky" />

        <DragFileOverlay onDrag={onDrag} />

        {processing && <Uploading token={data.token} />}
        
        {recentlySuccessful &&
          <Processing
            token={data.token}
            setRecentlySuccessful={setRecentlySuccessful} title='Merging PDFs...'
          />}
      </Warapper>
      <Sidebar
        title="Merge PDF"
        btn={{
          title: "Merge PDF",
          className: "btn btn-sky",
          onSubmit: submit,
        }}
      />
    </AppLayout>
  )
}

export default Index