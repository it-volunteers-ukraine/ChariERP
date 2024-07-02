'use client';
import { Field, FieldProps } from 'formik';

import { Error } from '@/utils';

import { Input } from '../input';
import { InputProps, InputOnChangeEventType } from '../input/types';

export const InputField = ({ name, label, ...props }: InputProps) => {
  return (
    <Field name={name}>
      {({ meta, form, field: { ...fieldProps } }: FieldProps) => {
        const error = Error.controlError(meta, name, label);

        const change = async (newValue: InputOnChangeEventType) => {
          if (name) {
            await form.setFieldValue(name, newValue);
          }
        };

        return <Input {...fieldProps} {...props} name={name} label={label} error={error} onChange={change} />;
      }}
    </Field>
  );
};
