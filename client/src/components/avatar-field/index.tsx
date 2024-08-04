'use client';
import { ChangeEvent } from 'react';
import { Field, FieldProps } from 'formik';
import { useTranslations } from 'next-intl';

import { AvatarFieldProps } from './types';
import { AvatarUploader } from '../avatar-uploader';

export const AvatarField = ({
  name,
  info,
  accept,
  maxSize,
  isSubmit,
  lastName,
  firstName,
  initialAvatarUrl,
}: AvatarFieldProps) => {
  const errors = useTranslations('errors.file');

  return (
    <Field name={name}>
      {({ meta, form, field: { value } }: FieldProps) => {
        const error = (meta.touched && meta.error && meta.error) || '';

        if (initialAvatarUrl) {
          form.setFieldValue(name, initialAvatarUrl);
        }

        const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          const extension = file?.name.split('.').pop()?.toLowerCase();
          const imageUrl = URL.createObjectURL(file as File);

          if (accept && extension && !accept.includes(extension)) {
            form.setFieldError(name, `${errors('extensions')} ${accept}`);
            form.setFieldTouched(name, true, false);

            return;
          }

          if (maxSize && file && file.size / (1024 * 1024) > maxSize) {
            form.setFieldError(name, `${errors('maxSize')} ${maxSize} MB`);
            form.setFieldTouched(name, true, false);

            return;
          }

          await form.setFieldValue(name, imageUrl);
        };

        const removeAvatar = async () => {
          await form.setFieldValue(name, '');
        };

        return (
          <AvatarUploader
            name={name}
            info={info}
            error={error}
            accept={accept}
            avatarUrl={value}
            lastName={lastName}
            isSubmit={isSubmit}
            onChange={onChange}
            firstName={firstName}
            removeAvatar={removeAvatar}
          />
        );
      }}
    </Field>
  );
};
