import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Roles } from '@/types';

import { CoreSelect } from '../../core';
import { BaseTrigger } from '../../triggers';
import { ListWithAddOptions } from '../../lists';
import { ISelectOption, OptionValue } from '../../types';

interface ISelectWithAddOptions {
  name: string;
  role?: string;
  isLoading?: boolean;
  translation?: string;
  placeholder?: string;
  selected: ISelectOption;
  withTranslate?: boolean;
  options: ISelectOption[];
  classNameWrapper?: string;
  classNameDropList?: string;
  onChange: (option: ISelectOption) => void;
}

export const SelectWithAddOptions = ({
  selected,
  onChange,
  translation,
  placeholder,
  classNameWrapper,
  classNameDropList,
  isLoading = false,
  role = Roles.MANAGER,
  withTranslate = false,
  options: initialOptions,
}: ISelectWithAddOptions) => {
  const [options, setOptions] = useState<ISelectOption[]>(initialOptions);

  const t = useTranslations(translation);

  const handleSelect = (option: ISelectOption) => {
    onChange(option);
  };

  const handleAddOption = (newOption: ISelectOption) => {
    setOptions((prev) => [...prev, newOption]);
  };

  const translate = (label: OptionValue) => (withTranslate ? t(String(label)) : label);

  return (
    <CoreSelect
      options={options}
      userRole={role}
      onChange={onChange}
      selected={selected}
      isLoading={isLoading}
      classNameWrapper={classNameWrapper}
      classNameDropList={classNameDropList}
      renderTrigger={({ selected, isOpen }) => (
        <BaseTrigger {...selected} isOpen={isOpen} t={translate} placeholder={placeholder} />
      )}
      renderList={({ options, setIsOpen }) => (
        <ListWithAddOptions
          options={options}
          setIsOpen={setIsOpen}
          onChange={handleSelect}
          activeSelected={selected}
          onAddOption={handleAddOption}
        />
      )}
    />
  );
};
