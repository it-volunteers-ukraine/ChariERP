'use client';
import { Field, FieldProps } from 'formik';
import { useTranslations } from 'next-intl';

import { Input } from '../input';
import { FileInputProps, InputOnChangeEventType } from '../input/types';

export const FileField = ({ name, label, accept, maxSize, ...props }: FileInputProps) => {
  const errors = useTranslations('errors.file');

  return (
    <Field name={name}>
      {({ meta, form, field: { value, ...fieldProps } }: FieldProps) => {
        const onChange = async (e: InputOnChangeEventType) => {
          if (typeof e === 'string') {
            await form.setFieldValue(name, '');

            return;
          }

          const target = e?.target as HTMLInputElement;
          const files = target.files;
          const file = files?.[0];

          if (!file) {
            return;
          }

          const extension = file.name.split('.').pop()?.toLowerCase();

          if (accept && extension && !accept.includes(extension)) {
            form.setFieldError(name, `${errors('extensions')} ${accept}`);
            form.setFieldTouched(name, true, false);

            return;
          }

          if (maxSize && file.size / (1024 * 1024) > maxSize) {
            form.setFieldError(name, `${errors('maxSize')} ${maxSize} MB`);
            form.setFieldTouched(name, true, false);

            return;
          }

          await form.setFieldValue(name, file);
        };

        return (
          <Input
            {...fieldProps}
            {...props}
            readOnly
            type="file"
            name={name}
            label={label}
            accept={accept}
            onChange={onChange}
            value={value?.name}
            error={(meta.touched && meta.error && meta.error) || ''}
          />
        );
      }}
    </Field>
  );
};
