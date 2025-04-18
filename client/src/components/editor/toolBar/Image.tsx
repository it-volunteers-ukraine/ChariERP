'use client';

import { useId } from 'react';
import { useTranslations } from 'next-intl';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { Img } from '@/assets/icons';
import { showMessage } from '@/components';
import { availableConvertFormats, compressConvertImage } from '@/utils';

import { INSERT_IMAGE_COMMAND } from '../node';

const MAX_FILE_SIZE = 5;

export const ImageButton = ({ className }: { className?: string }) => {
  const inputId = useId();
  const errorText = useTranslations('errors');
  const [editor] = useLexicalComposerContext();

  const insertImage = (url: string) => {
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, url);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const isValidFormat = availableConvertFormats.includes(file.type);

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
      <input
        type="file"
        id={inputId}
        className="hidden"
        onChange={handleFileChange}
        accept=".png, .jpeg, .jpg, .webp"
      />
      <label htmlFor={inputId} className={className}>
        <Img className="h-full" />
      </label>
    </>
  );
};
