'use client';

import { Field, FieldProps } from 'formik';

import 'react-datepicker/dist/react-datepicker.css';

import { controlError } from '@/utils';

import { DateFieldProps } from './types';

import { DateComponent } from '../date-picker';

export const DateField = ({
  name,
  label,
  disabled,
  required,
  inputType,
  placeholder,
  wrapperClass,
  minDate = '1944-01-01',
  ...props
}: DateFieldProps) => {
  return (
    <Field name={name}>
      {({ meta, form, field: { value, ...fieldProps } }: FieldProps) => {
        const error = controlError(meta, name, label);

        const onChange = async (value: Date | null) => {
          await form.setFieldValue(name, value?.getTime() || '');
          await form.setFieldTouched(name);
        };

        const handelClose = async () => {
          await form.setFieldTouched(name);
        };

        return (
          <DateComponent
            error={error}
            label={label}
            value={value}
            minDate={minDate}
            disabled={disabled}
            required={required}
            inputType={inputType}
            handelClose={handelClose}
            placeholder={placeholder}
            wrapperClass={wrapperClass}
            {...fieldProps}
            onChange={onChange}
            {...props}
          />
        );
      }}
    </Field>
  );
};
