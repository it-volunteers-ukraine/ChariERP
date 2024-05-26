'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Field, FieldProps } from 'formik';
import { uk, enGB } from 'date-fns/locale';
import DatePicker, { registerLocale } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { Input } from '../input';

import './style.css';
import { DateFieldProps } from './types';

registerLocale('ua', uk);
registerLocale('en', enGB);

export const DateField = ({ name, label, placeholder }: DateFieldProps) => {
  const locale = useLocale();

  return (
    <Field name={name}>
      {({ meta, form, field: { value, ...fieldProps } }: FieldProps) => {
        const onChange = async (value: Date | null) => {
          await form.setFieldValue(name, value);
        };

        return (
          <div className="[&>div]:w-full w-full">
            <DatePicker
              withPortal
              locale={locale}
              showYearDropdown
              selected={value}
              className="hidden"
              maxDate={new Date()}
              portalId="DatePicker"
              scrollableYearDropdown
              dateFormat="dd.MM.yyyy"
              yearDropdownItemNumber={150}
              placeholderText={placeholder}
              minDate={new Date('1991-01-01')}
              onChange={(date) => onChange(date)}
              customInput={
                <Input
                  {...fieldProps}
                  readOnly
                  ref={null}
                  type="date"
                  name={name}
                  label={label}
                  value={value}
                  error={(meta.error && meta.error) || ''}
                />
              }
            />
          </div>
        );
      }}
    </Field>
  );
};
