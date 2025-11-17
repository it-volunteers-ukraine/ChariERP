'use client';

import { useFormikContext } from 'formik';
import { SelectFactory } from '@/components/custom-select/fabric';
import { Roles } from '@/types';
import { ISelectOption, VariantKey } from '@/components/custom-select/types';

interface ISelectField {
  name: string;
  label?: string;
  options: ISelectOption[];
  role?: Roles;
  variant?: VariantKey;
  placeholder?: string;
  classNameWrapper?: string;
  isLoading?: boolean;
}

export const SelectField = ({
  name,
  label,
  options,
  role = Roles.MANAGER,
  variant = 'default',
  classNameWrapper,
  placeholder,
  isLoading = false,
}: ISelectField) => {
  const { values, setFieldValue, errors, touched } = useFormikContext<{ [key: string]: string }>();

  const selectedOption: ISelectOption | null = options.find((o) => o.id === values[name]) ?? null;

  const error = touched[name] && errors[name] ? errors[name] : '';

  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 font-medium">{label}</label>}

      <SelectFactory
        name={name}
        role={role}
        variant={variant}
        placeholder={placeholder}
        classNameWrapper={classNameWrapper}
        isLoading={isLoading}
        options={options}
        selected={selectedOption!}
        onChange={(option: ISelectOption) => {
          console.log('Обрано опцію:', option);

          setFieldValue(name, option.id);
        }}
      />

      {error && <span className="text-red-500 mt-1 text-sm">{error}</span>}
    </div>
  );
};
