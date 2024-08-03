'use client';

import { Field, FieldProps } from 'formik';

import { Input } from '../input';
import { FileInputProps, InputOnChangeEventType } from '../input/types';

export const FileField = ({ name, label, ...props }: FileInputProps) => {
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
            onChange={onChange}
            value={value?.name}
            error={meta && meta.error}
          />
        );
      }}
    </Field>
  );
};
