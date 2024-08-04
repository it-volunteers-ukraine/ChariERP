'use client';
import { ChangeEvent } from 'react';
import { Field, FieldProps } from 'formik';
import { useTranslations } from 'next-intl';

import { AvatarFieldProps } from './types';
import { AvatarUploader } from '../avatar-uploader';

export const AvatarField = ({
  name,
  accept,
  withAbb,
  maxSize,
  lastName,
  firstName,
  initialAvatarUrl,
}: AvatarFieldProps) => {
  const errors = useTranslations('errors.file');

  return (
    <Field name={name}>
      {({ meta, form, field: { value } }: FieldProps) => {
        if (initialAvatarUrl) {
          form.setFieldValue(name, initialAvatarUrl);
        }

        const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          const extension = file?.name.split('.').pop()?.toLowerCase();

          if (file) {
            const reader = new FileReader();

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

            reader.onloadend = async () => {
              await form.setFieldValue(name, reader.result as string);
            };

            reader.readAsDataURL(file);
          }
        };

        const removeAvatar = async () => {
          await form.setFieldValue(name, '');
        };

        return (
          <AvatarUploader
            name={name}
            accept={accept}
            withAbb={withAbb}
            avatarUrl={value}
            lastName={lastName}
            onChange={onChange}
            firstName={firstName}
            removeAvatar={removeAvatar}
            error={(meta.touched && meta.error && meta.error) || ''}
          />
        );
      }}
    </Field>
  );
};
