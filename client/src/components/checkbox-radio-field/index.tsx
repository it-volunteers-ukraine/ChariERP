'use client';
import { ChangeEvent } from 'react';
import { Field, FieldProps } from 'formik';

import { Error } from '@/utils';

import { CheckboxRadio } from '../checkbox-radio';
import { ICheckboxProps } from '../checkbox-radio/types';

export const CheckboxRadioField = ({
  name,
  label,
  ...props
}: ICheckboxProps) => {
  return (
    <Field name={name}>
      {({ meta, form, field: { ...fieldProps } }: FieldProps) => {
        const error = Error.controlError(meta, name, label);

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
            error={error}
            label={label}
            onChange={change}
            checked={fieldProps.value}
          />
        );
      }}
    </Field>
  );
};
