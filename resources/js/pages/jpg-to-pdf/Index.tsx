import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { v4 as uuid } from "uuid";
import { useShallow } from "zustand/react/shallow";

import { useFileStore } from "@/store/use-file-store";
import { Margin, Orientation, Upload } from "@/types/upload";

import AppLayout from "@/layouts/AppLayout";
import Hero from "@/components/merge-pdf/Hero";
import FileInput from "@/components/uploads/FileInput";
import DragFileOverlay from "@/components/uploads/DragFileOverlay";
import Sidebar from "@/components/Sidebar";
import Uploading from "@/components/uploads/Uploading";
import Processing from "@/components/uploads/Processing";
import useFilePreview from "@/hook/use-file-preview";
import Warapper from "@/components/Warapper";
import PdfOptions from "@/components/jpg-to-pdf/PdfOptions";
import ImageThumbnailGrid from "@/components/uploads/ImageThumbnailGrid";

export default function JpgToPdf() {
  const { data, setData, post, processing } = useForm<
    Upload & { orientation: Orientation; margin: Margin }
  >({
    files: null,
    token: uuid(),
    orientation: "P",
    margin: 0,
  });
  const [recentlySuccessful, setRecentlySuccessful] = useState(false);

  const { files, onDrag, setOnDrag } = useFileStore(
    useShallow((state) => ({
      files: state.files,
      onDrag: state.onDrag,
      setOnDrag: state.setOnDrag,
    })),
  );

  const { onSelectFile, handleOnDrop, deleteFile } = useFilePreview({
    multiple: true,
    type: "image",
  });

  useEffect(() => {
    setData("files", files);
  }, [files]);

  const submit: React.FormEventHandler = (e) => {
    e.preventDefault();

    post(route("jpg_to_pdf.store"), {
      onSuccess: () => setRecentlySuccessful(true),
    });
  };

  return (
    <AppLayout title="JPG to PDF">
      <Warapper
        tabIndex={0}
        onDragEnter={() => setOnDrag(true)}
        onDragExit={() => setOnDrag(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleOnDrop}
        className="!h-[calc(100vh_-_128px)]"
      >
        {files.length === 0 && (
          <Hero
            title="JPG to PDF"
            description="Convert JPG images to PDF in seconds. Easily adjust orientation and margins."
            btn={{ title: "Select Image files", className: "btn btn-pink" }}
            dropLabel="or drop images here"
          />
        )}

        <FileInput
          onSelectFile={onSelectFile}
          multiple={true}
          accept="image/*"
        />

        <ImageThumbnailGrid
          files={files}
          deleteFile={deleteFile}
          className="btn btn-pink"
        />

        <DragFileOverlay onDrag={onDrag} />

        {processing && <Uploading token={data.token} />}
        {recentlySuccessful && (
          <Processing
            title="Converting JPG to PDF..."
            token={data.token}
            setRecentlySuccessful={setRecentlySuccessful}
          />
        )}
      </Warapper>

      <Sidebar
        title="Image to PDF options"
        btn={{
          title: "Convert to PDF",
          className: "btn btn-pink",
          onSubmit: submit,
        }}
      >
        <PdfOptions data={data} setData={setData} />
      </Sidebar>
    </AppLayout>
  );
}
