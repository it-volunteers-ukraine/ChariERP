import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Roles } from '@/types';

import { BaseList } from '../../lists';
import { CoreSelect } from '../../core';
import { BaseTrigger } from '../../triggers';
import { ISelectOption, OptionValue } from '../../types';

interface IBaseSelectWithTranslate {
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

export const BaseSelectWithTranslate = ({
  options,
  selected,
  onChange,
  translation,
  placeholder,
  classNameWrapper,
  classNameDropList,
  isLoading = false,
  role = Roles.MANAGER,
  withTranslate = false,
}: IBaseSelectWithTranslate) => {
  const [activeSelected, setActiveSelected] = useState<ISelectOption>(selected);
  const t = useTranslations(translation);

  const handleSelect = (options: ISelectOption) => {
    if (activeSelected?.id !== options.id) {
      setActiveSelected(options);
    }
  };

  const translate = (label: OptionValue) => (withTranslate ? t(String(label)) : label);

  return (
    <CoreSelect
      userRole={role}
      options={options}
      onChange={onChange}
      isLoading={isLoading}
      selected={activeSelected}
      classNameWrapper={classNameWrapper}
      classNameDropList={classNameDropList}
      renderTrigger={({ selected, isOpen }) => (
        <BaseTrigger {...selected} isOpen={isOpen} t={translate} placeholder={placeholder} />
      )}
      renderList={({ options, setIsOpen }) => (
        <BaseList
          t={translate}
          options={options}
          setIsOpen={setIsOpen}
          onChange={handleSelect}
          activeSelected={activeSelected}
        />
      )}
    />
  );
};
