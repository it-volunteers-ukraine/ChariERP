'use client';

import { ChangeEvent } from 'react';
import { Field, FieldProps } from 'formik';

import { AvatarFieldProps } from './types';
import { AvatarUploader } from '../avatar-uploader';

export const AvatarField = ({ name, info, isSubmit, lastName, firstName, className }: AvatarFieldProps) => {
  return (
    <Field name={name}>
      {({ meta, form, field: { value } }: FieldProps) => {
        const error = (meta.touched && meta.error && meta.error) || '';

        const { avatarInitial } = form.values;

        const previewUrl = value ? URL.createObjectURL(value) : meta.touched && !value ? value : avatarInitial;

        const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];

          if (file) {
            const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
            const isValidFormat = allowedFormats.includes(file.type);

            if (!isValidFormat) {
              e.target.value = '';

              return;
            }

            await form.setFieldValue(name, file);
            await form.setFieldValue(`isImgChange`, true);
            form.setFieldTouched(name);
          }
        };

        const removeAvatar = async () => {
          await form.setFieldValue(name, '');
          await form.setFieldValue(`isImgChange`, true);
          form.setFieldTouched(name);
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
