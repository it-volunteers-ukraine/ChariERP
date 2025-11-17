'use client';

import { useFormikContext } from 'formik';

import { Roles } from '@/types';
import { Warning } from '@/assets/icons';
import { IFormAddedItemsValues } from '../form-added-items/type';
import { SelectFactory } from '@/components/custom-select/fabric';
import { ISelectOption, VariantKey } from '@/components/custom-select/types';

interface ISelectField {
  role?: Roles;
  label?: string;
  isLoading?: boolean;
  variant?: VariantKey;
  placeholder?: string;
  options: ISelectOption[];
  classNameWrapper?: string;
  name: keyof IFormAddedItemsValues;
}

export const SelectField = ({
  name,
  label,
  options,
  placeholder,
  classNameWrapper,
  isLoading = false,
  variant = 'default',
  role = Roles.MANAGER,
}: ISelectField) => {
  const { values, setFieldValue, errors, touched } = useFormikContext<IFormAddedItemsValues>();

  const selectedOption = options.find((o) => o.id === values[name]) ?? null;
  const error = touched[name] && errors[name] ? String(errors[name]) : '';

  const wrapperClass = `${classNameWrapper} rounded-lg transition-all duration-300 ${
    error ? 'border-red-500' : 'border-arctic-sky'
  }`;

  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 font-medium">{label}</label>}
      <SelectFactory
        name={name}
        role={role}
        variant={variant}
        options={options}
        isLoading={isLoading}
        placeholder={placeholder}
        selected={selectedOption!}
        classNameWrapper={wrapperClass}
        onChange={(option: ISelectOption) => setFieldValue(name, option.id)}
      />

      {error && (
        <div className="mt-1 flex gap-1">
          <Warning width={14} height={14} />

          <span className="text-input-error text-[12px]/[14px]">{error}</span>
        </div>
      )}
    </div>
  );
};
