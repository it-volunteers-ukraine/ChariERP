'use client';

import { ChangeEvent } from 'react';
import { Field, FieldProps } from 'formik';
import { useTranslations } from 'next-intl';

import { availableConvertFormats } from '@/utils';

import { showMessage } from '../toastify';
import { AvatarFieldProps } from './types';
import { AvatarUploader } from '../avatar-uploader';

const MAX_FILE_SIZE = 5;

export const AvatarField = ({ name, info, isSubmit, lastName, firstName, className }: AvatarFieldProps) => {
  const errorText = useTranslations('errors');

  return (
    <Field name={name}>
      {({ meta, form, field: { value } }: FieldProps) => {
        const error = (meta.touched && meta.error && meta.error) || '';

        const { avatarInitial, isImgChange } = form.values;

        const urlObject = value ? URL.createObjectURL(value) : value;
        const previewUrl = !isImgChange ? avatarInitial : urlObject;

        const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];

          if (file) {
            const isValidFormat = availableConvertFormats.includes(file.type);

            if (!isValidFormat) {
              showMessage.error(errorText('fileDownload'));
              e.target.value = '';

              return;
            }

            if (file.size > MAX_FILE_SIZE * 1024 * 1024) {
              showMessage.error(errorText('fileSizeExceeded', { mb: MAX_FILE_SIZE }));
              e.target.value = '';

              return;
            }

            await form.setFieldValue(name, file);
            await form.setFieldValue('isImgChange', true);
            form.setFieldTouched(name);
          }

          e.target.value = '';
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
