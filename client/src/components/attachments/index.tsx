'use client';

import { useState } from 'react';

import { PaperClip } from '@/assets/icons';

import { AddCard } from './add-card';
import { FileCard } from './file-card';

export const Attachments = () => {
  const [files, setFiles] = useState<{ file: File; preview: string | null }[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setFiles((prev) => [...prev, ...newFiles]);
      event.target.value = '';
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="flex flex-col gap-3 p-[10px_28px]">
      <div className="flex items-center gap-2">
        <PaperClip />

        <h1 className="font-scada text-[20px] font-bold text-lightBlue">ВКЛАДЕННЯ</h1>
      </div>

      <div className="flex flex-wrap gap-x-[7px] gap-y-[20px] tablet:gap-x-[20px]">
        <AddCard addFile={handleFileChange} />

        {files.map(({ file, preview }, index) => (
          <FileCard file={file} preview={preview} key={index} removeFile={() => handleRemoveFile(index)} />
        ))}
      </div>
    </div>
  );
};
