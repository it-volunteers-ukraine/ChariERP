'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { PaperClip } from '@/assets/icons';

import { AddCard } from './add-card';
import { FileCard } from './file-card';

export const Attachments = () => {
  const [files, setFiles] = useState<{ file: File; preview: string | null }[]>([]);

  const text = useTranslations('attachments');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const newFile = Array.from(selectedFiles).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setFiles((prev) => [...prev, ...newFile]);
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

        <h1 className="font-scada text-xl font-bold text-lightBlue">{text('title')}</h1>
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
