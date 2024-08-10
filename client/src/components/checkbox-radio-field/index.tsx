'use client';

import { ChangeEvent } from 'react';
import { Field, FieldProps } from 'formik';

import { controlError } from '@/utils';

import { CheckboxRadio } from '../checkbox-radio';
import { ICheckboxProps } from '../checkbox-radio/types';

export const CheckboxRadioField = ({ id, name, type, label, onChange, multiple, ...props }: ICheckboxProps) => {
  return (
    <Field name={name}>
      {({ meta, form, field: { value, ...fieldProps } }: FieldProps) => {
        const error = controlError(meta, name, label);
        const isTypeRadio = type === 'radio';

        const change = async (e: ChangeEvent<HTMLInputElement>) => {
          if (name) {
            if (isTypeRadio && multiple) {
              await form.setFieldValue(name, {
                id,
                value: e.target.checked,
              });

              return;
            }

            await form.setFieldValue(name, e.target.checked);
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
            multiple={multiple}
            onChange={onChange ? onChange : change}
            checked={isTypeRadio ? value.id === id : value}
          />
        );
      }}
    </Field>
  );
};
