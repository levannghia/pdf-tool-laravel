import Warapper from '@/components/Warapper'
import Hero from '@/components/merge-pdf/Hero'
import DragFileOverlay from '@/components/uploads/DragFileOverlay'
import FileInput from '@/components/uploads/FileInput'
import AppLayout from '@/layouts/AppLayout'
import { useFileStore } from '@/store/user-file-store'
import {v4 as uuid} from 'uuid'
import React from 'react'
import { useShallow } from 'zustand/react/shallow'
import {Upload} from '@/types/upload';
import { useForm } from '@inertiajs/react'
import useFilePreview from '@/hook/use-file-preview'

function Index() {
  const {data, setData, post, processing} = useForm<Upload>({
    files: null,
    token: uuid()
  })

  const {files, onDrag, setOnDrag} = useFileStore(useShallow((state) => ({
    files: state.files,
    onDrag: state.onDrag,
    setOnDrag: state.onDrag
  })))

  const { onSelectFile } = useFilePreview();
  return (
    <AppLayout title='Merge PDF Files'>
      <Warapper>
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
        <DragFileOverlay onDrag={true}/>
      </Warapper>
    </AppLayout>
  )
}

export default Index