'use client';
import { Field, FieldProps } from 'formik';

import { Error } from '@/utils';

import { CheckboxRadio } from '../checkbox-radio';
import { InputOnChangeEventType } from '../input/types';
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

        const change = async (newValue: InputOnChangeEventType) => {
          if (name) {
            await form.setFieldValue(name, newValue);
            form.setFieldTouched(name);
          }
        };

        return (
          <CheckboxRadio
            {...fieldProps}
            {...props}
            error={error}
            label={label}
            onChange={() => change(label)}
          />
        );
      }}
    </Field>
  );
};
