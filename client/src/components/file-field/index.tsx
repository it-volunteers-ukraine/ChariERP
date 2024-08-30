'use client';

import { Field, FieldProps } from 'formik';

import { controlError } from '@/utils';

import { Input } from '../input';
import { FileInputProps, InputOnChangeEventType } from '../input/types';

export const FileField = ({ name, label, ...props }: FileInputProps) => {
  return (
    <Field name={name}>
      {({ meta, form, field: { value, ...fieldProps } }: FieldProps) => {
        const error = controlError(meta, name, label);

        const onChange = async (e: InputOnChangeEventType) => {
          if (typeof e === 'string') {
            await form.setFieldValue(name, '');

            return;
          }

          const files = (e as React.ChangeEvent<HTMLInputElement>).target.files;

          if (files instanceof FileList) {
            const file = files?.[0];

            if (file) {
              await form.setFieldValue(name, file);
              form.setFieldTouched(name);

              (e as React.ChangeEvent<HTMLInputElement>).target.value = '';
            }
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
            error={error}
            onChange={onChange}
            value={value?.name}
          />
        );
      }}
    </Field>
  );
};
