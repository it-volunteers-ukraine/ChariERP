import { Form, Formik } from 'formik';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/button';
import { Overlay } from '@/components/overlay';
import { InputField } from '@/components/input-field';
import { linkValidation } from '@/components/formik-config';

interface ILinkModal {
  isOpen: boolean;
  text?: string;
  url?: string;
  onClose: () => void;
  onSave: (text: string, url: string) => void;
}

export const LinkModal = ({ isOpen, text = '', url = '', onClose, onSave }: ILinkModal) => {
  const validationText = useTranslations('validation');

  const handleSubmit = (values: { textLink: string; url: string }) => {
    onSave(values.textLink, values.url);
    onClose();
  };

  return (
    <Overlay opened={isOpen} onClose={onClose} classNameModal="flex flex-col max-w-[450px]">
      <h2 className="mb-4 text-lg font-semibold">Додати посилання</h2>

      <Formik
        onSubmit={handleSubmit}
        initialValues={{ textLink: text, url: url }}
        validationSchema={linkValidation(validationText)}
      >
        {() => (
          <Form>
            <InputField required type="text" label="Введіть текст посилання" name="textLink" />
            <InputField required type="text" placeholder="https://" label="Введіть url адресу" name="url" />

            <div className="mt-4 flex justify-end gap-6">
              <Button onClick={onClose} text="Cancel" styleType="outline-blue" />
              <Button text="Add" styleType="primary" />
            </div>
          </Form>
        )}
      </Formik>
    </Overlay>
  );
};
