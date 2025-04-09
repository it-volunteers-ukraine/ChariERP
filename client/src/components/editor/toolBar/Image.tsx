'use client';

import { useId } from 'react';
import { useTranslations } from 'next-intl';

import { Img } from '@/assets/icons';
import { compressConvertImage } from '@/utils';
import { showMessage } from '@/components/toastify';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { INSERT_IMAGE_COMMAND } from '../node';

const MAX_FILE_SIZE = 5;

export const ImageButton = ({ className }: { className?: string }) => {
  const [editor] = useLexicalComposerContext();
  const inputId = useId();
  const errorText = useTranslations('errors');

  const insertImage = (url: string) => {
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, url);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
      const isValidFormat = allowedFormats.includes(file.type);

      if (!isValidFormat) {
        showMessage.error(errorText('fileDownload'));
        event.target.value = '';

        return;
      }

      if (file.size > MAX_FILE_SIZE * 1024 * 1024) {
        showMessage.error(errorText('fileSizeExceeded', { mb: MAX_FILE_SIZE }));
        event.target.value = '';

        return;
      }

      try {
        const result = await compressConvertImage({
          file,
        });

        insertImage(result.base64);
      } catch {
        showMessage.error(errorText('errorDownload'));
      }
    }
  };

  return (
    <>
      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id={inputId} />
      <label htmlFor={inputId} className={className}>
        <Img className="h-full" />
      </label>
    </>
  );
};
