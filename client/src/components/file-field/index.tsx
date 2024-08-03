'use client';

import { Field, FieldProps } from 'formik';

import { Error } from '@/utils';

import { Input } from '../input';
import { FileInputProps, InputOnChangeEventType } from '../input/types';

export const FileField = ({ name, label, ...props }: FileInputProps) => {
  return (
    <Field name={name}>
      {({ meta, form, field: { value, ...fieldProps } }: FieldProps) => {
        const error = Error.controlError(meta, name, label);

        const onChange = async (files: InputOnChangeEventType) => {
          if (typeof files === 'string') {
            await form.setFieldValue(name, '');

            return;
          }

          if (files instanceof FileList) {
            const file = files?.[0];

            await form.setFieldValue(name, file);
            form.setFieldTouched(name);
          }
        };

        return (
          <Input
            {...fieldProps}
            {...props}
            readOnly
            type="file"
            name={name}
            label={label}
            onChange={onChange}
            value={value?.name}
            error={error}
          />
        );
      }}
    </Field>
  );
};
