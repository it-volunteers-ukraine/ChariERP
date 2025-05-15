'use client';

import React, { forwardRef, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useLocale } from 'next-intl';
import { uk, enGB } from 'date-fns/locale';
import DatePicker, { registerLocale } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { dateFormat } from '@/constants';

import { DateFieldProps } from './types';
import { InputProps } from '../input/types';
import { InputTypeEnum } from '../date-field/types';
import { CustomInputSwitch } from '../date-field/helpers';

import './style.css';

registerLocale('ua', uk);
registerLocale('en', enGB);

export interface IDatePickerInput extends InputProps {
  isRequired?: string;
  inputType?: InputTypeEnum;
}

const DatePickerInput = forwardRef(
  ({ inputType, isRequired, ...props }: IDatePickerInput, ref: React.Ref<HTMLInputElement>) => {
    const Input = CustomInputSwitch(inputType);

    return <Input {...props} required={Boolean(isRequired)} ref={ref} />;
  },
);

DatePickerInput.displayName = 'DatePickerInput';

export const DateComponent = ({
  name,
  label,
  value,
  error,
  disabled,
  required,
  onChange,
  inputType,
  placeholder,
  handelClose,
  wrapperClass,
  minDate = '1944-01-01',
  ...props
}: DateFieldProps) => {
  const locale = useLocale();
  const pickerRef = useRef<DatePicker>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const wrapperClassName = clsx('[&>div]:w-full w-full', {
    [`${wrapperClass}`]: !!wrapperClass,
  });

  const openPicker = async () => {
    const currentWrapper = wrapperRef.current;
    const currentPicker = pickerRef.current;

    if (currentPicker && !disabled) {
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
    <div className={wrapperClassName} tabIndex={0} ref={wrapperRef}>
      <DatePicker
        withPortal
        ref={pickerRef}
        locale={locale}
        showYearDropdown
        className="hidden"
        disabled={disabled}
        maxDate={new Date()}
        portalId="DatePicker"
        scrollableYearDropdown
        dateFormat={dateFormat}
        minDate={new Date(minDate)}
        yearDropdownItemNumber={150}
        placeholderText={placeholder}
        onCalendarClose={handelClose}
        onChange={onChange}
        selected={value ? new Date(value) : null}
        customInput={
          <DatePickerInput
            {...props}
            readOnly
            type="date"
            name={name}
            label={label}
            error={error}
            inputType={inputType}
            isRequired={`${required}`}
          />
        }
      />
    </div>
  );
};
