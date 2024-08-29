'use client';

import { ChangeEvent } from 'react';
import { Field, FieldProps } from 'formik';

import { controlError } from '@/utils';

import { CheckboxRadio } from '../checkbox-radio';
import { ICheckboxProps } from '../checkbox-radio/types';

export const CheckboxField = ({ name, label, ...props }: ICheckboxProps) => {
  return (
    <Field name={name}>
      {({ meta, form, field: { value: checked, ...fieldProps } }: FieldProps) => {
        const error = controlError(meta, name, label);

        const change = async (e: ChangeEvent<HTMLInputElement>) => {
          if (name) {
            await form.setFieldValue(name, e.target.checked);
            form.setFieldTouched(name);
          }
        };

        return (
          <CheckboxRadio
            {...fieldProps}
            {...props}
            name={name}
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
