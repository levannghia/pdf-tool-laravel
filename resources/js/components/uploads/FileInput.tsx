import React from 'react'

type FileInputProps = {
    accept?: string;
    multiple?: boolean;
    onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function FileInput({accept, multiple, onSelectFile}: FileInputProps) {
  return (
    <input
        type='file'
        id='files'
        className='hidden'
        multiple={multiple}
        accept={accept}
        onChange={onSelectFile}
    />
  )
}

export default FileInput