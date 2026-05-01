import React, { useState } from 'react';

interface Props {
  name: string;
  setFieldValue: (field: string, value: any) => void;
  validTypesLabel?: string;
  validTypes?: string[];
}

const FileUpload = ({
  name,
  setFieldValue,
  validTypesLabel = 'PNG, JPG, JPEG until 10MB',
  validTypes = ['image/png', 'image/jpg', 'image/jpeg']
} : Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if(file) handleFile(file);
  }

  const handleFile = (file: File) => {
    setFieldValue(name, file);

    if(file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  }

  return (
    <div className='space-y-4'>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}

        className={`
          border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition
          ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-slate-600 hover:border-slate-400'}  
        `}
      >
        <input
          type='file'
          onChange={(e) => {
            const file = e.target.files?.[0];
            if(file) handleFile(file);
          }}
          className='hidden'
          id={name}
          accept={validTypes?.join(',')}
        />

        <label htmlFor={name} className='cursor-pointer block'>
          <p className='text-slate-300'>
            Drag & drop or {' '}
            <span className='text-blue-400 underline'>browse</span>
          </p>

          <p className='text-xs text-slate-500 mt-1'>
            {validTypesLabel}
          </p>
        </label>
      </div>

      { preview && (
        <div className='relative w-32 h-32'>
          <img
            src={preview}
            alt='preview'
            className='w-full h-full object-cover rounded-lg border border-slate-700'
          />

          <button
            type='button'
            onClick={() => {
              setPreview(null)
              setFieldValue(name, null);
            }}
            className='absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded cursor-pointer'
          >
            ✕
          </button>
        </div>
      ) }
    </div>
  )
}

export default FileUpload;