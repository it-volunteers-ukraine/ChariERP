'use client';

import { ChangeEvent } from 'react';
import { Field, FieldProps } from 'formik';

import { controlError } from '@/utils';

import { CheckboxRadio } from '../checkbox-radio';
import { ICheckboxProps } from '../checkbox-radio/types';

export const CheckboxRadioField = ({ name, type, label, multiple, value: labelValue, ...props }: ICheckboxProps) => {
  return (
    <Field name={name}>
      {({ meta, form, field: { value: checked, ...fieldProps } }: FieldProps) => {
        const error = controlError(meta, name, label);
        const isTypeRadio = type === 'radio';

        const change = async (e: ChangeEvent<HTMLInputElement>) => {
          if (name) {
            if (isTypeRadio) {
              await form.setFieldValue(name, labelValue);

              return;
            } else {
              await form.setFieldValue(name, e.target.checked);
            }

            form.setFieldTouched(name);
          }
        };

        return (
          <CheckboxRadio
            {...fieldProps}
            {...props}
            type={type}
            name={name}
            error={error}
            label={label}
            onChange={change}
            multiple={multiple}
            checked={isTypeRadio ? labelValue === checked : checked}
          />
        );
      }}
    </Field>
  );
};
