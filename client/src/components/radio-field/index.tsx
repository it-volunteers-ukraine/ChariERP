'use client';

import { Field, FieldProps } from 'formik';

import { controlError } from '@/utils';

import { CheckboxRadio } from '../checkbox-radio';
import { ICheckboxProps } from '../checkbox-radio/types';

export const RadioField = ({ name, label, value: labelValue, ...props }: ICheckboxProps) => {
  return (
    <Field name={name}>
      {({ meta, form, field: { value: checked, ...fieldProps } }: FieldProps) => {
        const error = controlError(meta, name, label);

        const change = async () => {
          if (name) {
            await form.setFieldValue(name, labelValue);
            form.setFieldTouched(name);
          }
        };

        return (
          <CheckboxRadio
            {...fieldProps}
            {...props}
            name={name}
            type="radio"
            error={error}
            label={label}
            onChange={change}
            checked={labelValue === checked}
          />
        );
      }}
    </Field>
  );
};
