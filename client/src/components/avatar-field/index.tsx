'use client';

import { ChangeEvent } from 'react';
import { Field, FieldProps } from 'formik';

import { AvatarFieldProps } from './types';
import { AvatarUploader } from '../avatar-uploader';

export const AvatarField = ({
  name,
  info,
  isSubmit,
  lastName,
  firstName,
  className,
  initialAvatarUrl,
}: AvatarFieldProps) => {
  return (
    <Field name={name}>
      {({ meta, form, field: { value } }: FieldProps) => {
        const error = (meta.touched && meta.error && meta.error) || '';
        const previewUrl = value && URL.createObjectURL(value);

        if (initialAvatarUrl) {
          form.setFieldValue(name, initialAvatarUrl);
        }

        const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];

          if (file) {
            await form.setFieldValue(name, file);
            form.setFieldTouched(name);
          }
        };

        const removeAvatar = async () => {
          await form.setFieldValue(name, '');
        };

        return (
          <AvatarUploader
            name={name}
            info={info}
            error={error}
            lastName={lastName}
            isSubmit={isSubmit}
            onChange={onChange}
            className={className}
            firstName={firstName}
            avatarUrl={previewUrl}
            removeAvatar={removeAvatar}
          />
        );
      }}
    </Field>
  );
};
