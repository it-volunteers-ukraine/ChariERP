'use client';
import { Field, FieldProps } from 'formik';

import { Input } from '../input';
import { InputProps, InputOnChangeEventType } from '../input/types';

export const InputField = ({ name, ...props }: InputProps) => {
  return (
    <Field name={name}>
      {({ meta, form, field: { ...fieldProps } }: FieldProps) => {
        const error = meta.touched && meta.error ? meta.error : undefined;

        const change = async (newValue: InputOnChangeEventType) => {
          if (name) {
            await form.setFieldValue(name, newValue);
            form.setFieldTouched(name);
          }
        };

        return (
          <Input
            {...fieldProps}
            {...props}
            name={name}
            error={error}
            onChange={change}
          />
        );
      }}
    </Field>
  );
};
