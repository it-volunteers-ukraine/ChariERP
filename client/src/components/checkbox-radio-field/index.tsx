'use client';
import { ChangeEvent } from 'react';
import { Field, FieldProps } from 'formik';

import { Error } from '@/utils';

import { CheckboxRadio } from '../checkbox-radio';
import { ICheckboxProps } from '../checkbox-radio/types';

export const CheckboxRadioField = ({
  name,
  type,
  label,
  ...props
}: ICheckboxProps) => {
  return (
    <Field name={name}>
      {({ meta, form, field: { value, ...fieldProps } }: FieldProps) => {
        const error = Error.controlError(meta, name, label);
        const checked = type === 'radio' ? value === label : value;

        const change = async (e: ChangeEvent<HTMLInputElement>) => {
          if (name) {
            const value = type === 'radio' ? e.target.value : e.target.checked;

            await form.setFieldValue(name, value);
            form.setFieldTouched(name);
          }
        };

        return (
          <CheckboxRadio
            {...fieldProps}
            {...props}
            type={type}
            error={error}
            label={label}
            onChange={change}
            checked={checked}
          />
        );
      }}
    </Field>
  );
};
