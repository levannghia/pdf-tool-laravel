import NavBar from '@/components/NavBar'
import { Head, usePage } from '@inertiajs/react'
import React, { PropsWithChildren, useEffect } from 'react'
import Footer from '@/components/Footer'
import { Worker } from '@react-pdf-viewer/core';
import { toast, Toaster } from 'sonner';
import { useThemeStore } from '@/store/use-theme-store';
import { useShallow } from 'zustand/react/shallow';
import { useFileStore } from '@/store/use-file-store';
import { PageProps } from '@/types';

function AppLayout({ title, footer = false, children }: PropsWithChildren<{ title: string, footer?: boolean }>) {
  const props = usePage<PageProps>().props;
  const theme = useThemeStore((state) => state.theme);
  const [errors, clearStore] = useFileStore(
    useShallow((state) => [state.errors, state.clearStore]),
  );

  useEffect(clearStore, []);

  useEffect(() => {
    props.success_msg && toast.success(props.success_msg);
    props.error_msg && toast.error(props.error_msg);

    props.errors && 
      Object.keys(props.errors).forEach((key) => toast.error(props.errors[key]));
  }, [props])

  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
    }
  }, [errors]);
  return (
    <>
      <Head title={title} />
      <NavBar />
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <div className='flex '>{children}</div>
        <Toaster richColors duration={3000} closeButton theme={theme} />
      </Worker>
      {footer && <Footer />}
    </>
  )
}

export default AppLayout