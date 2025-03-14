'use client';

import { Form, Formik } from 'formik';
import { useTranslations } from 'next-intl';

import { compressConvertImage } from '@/utils';
import { showMessage } from '@/components/toastify';
import { InputField } from '@/components/input-field';
import { imageUrlValidation } from '@/components/formik-config';

import { Overlay } from '../../overlay';
import { Button } from '@/components/button';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (url: string) => void;
}

const MAX_FILE_SIZE = 5;

export const ImageModal = ({ isOpen, onClose, onInsert }: ImageModalProps) => {
  const errorText = useTranslations('errors');
  const text = useTranslations('editor.modalImg');
  const validationText = useTranslations('validation');

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

        onInsert(result.url);

        onClose();
      } catch {
        showMessage.error(errorText('errorDownload'));
      }
    }
  };

  const handleInsert = (values: { imageUrl: string }) => {
    onInsert(values.imageUrl);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <Overlay opened={isOpen} onClose={onClose} classNameModal="flex flex-col rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-2 text-lg font-semibold">{text('title')}</h2>
      <Formik
        onSubmit={handleInsert}
        initialValues={{ imageUrl: '' }}
        validationSchema={imageUrlValidation(validationText)}
      >
        {() => (
          <Form>
            <InputField required type="text" label={text('inputUrl')} placeholder="https://" name="imageUrl" />

            <div className="mt-4 flex items-center justify-between">
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="file-upload" />
              <label
                htmlFor="file-upload"
                className="flex h-[42px] cursor-pointer items-center justify-center rounded-50 border-[1px] border-lightBlue px-5 font-scada text-[16px] leading-4 text-lightBlue transition-all duration-300 hover:border-[#0C6399] hover:text-[#0C6399]"
              >
                {text('inputFile')}
              </label>
              <Button type="submit" styleType="primary">
                {text('add')}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Overlay>
  );
};
