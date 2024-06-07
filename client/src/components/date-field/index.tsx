'use client';

import React, { useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { Field, FieldProps } from 'formik';
import { uk, enGB } from 'date-fns/locale';
import DatePicker, { registerLocale } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { Error } from '@/utils';

import { Input } from '../input';
import { DateFieldProps } from './types';

import './style.css';

registerLocale('ua', uk);
registerLocale('en', enGB);

export const DateField = ({
  name,
  label,
  placeholder,
  ...props
}: DateFieldProps) => {
  const locale = useLocale();
  const pickerRef = useRef<DatePicker>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const openPicker = async () => {
    const currentWrapper = wrapperRef.current;
    const currentPicker = pickerRef.current;

    if (currentPicker) {
      await currentPicker.setOpen(true);
      currentWrapper?.blur();
    }
  };

  useEffect(() => {
    const currentWrapper = wrapperRef.current;

    if (currentWrapper) {
      currentWrapper.addEventListener('focus', openPicker);
    }

    return () => currentWrapper?.removeEventListener('focus', openPicker);
  }, [wrapperRef]);

  return (
    <Field name={name}>
      {({ meta, form, field: { value, ...fieldProps } }: FieldProps) => {
        const error = Error.controlError(meta, name, label);

        const onChange = async (value: Date | null) => {
          await form.setFieldValue(name, value);
        };

        const handelClose = async () => {
          await form.setFieldTouched(name);
        };

        return (
          <div className="[&>div]:w-full w-full" tabIndex={0} ref={wrapperRef}>
            <DatePicker
              withPortal
              ref={pickerRef}
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
              onCalendarClose={() => handelClose()}
              customInput={
                <Input
                  {...fieldProps}
                  {...props}
                  readOnly
                  ref={null}
                  type="date"
                  name={name}
                  label={label}
                  value={value}
                  error={error}
                  placeholder={placeholder}
                />
              }
            />
          </div>
        );
      }}
    </Field>
  );
};
