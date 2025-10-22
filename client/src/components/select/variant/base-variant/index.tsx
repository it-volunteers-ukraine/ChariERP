import { useState } from 'react';

import { ISelectOption, OptionValue } from '../../select-logic-wrapper/types';
import { BaseTrigger } from '../../triggers';
import { BaseList } from '../../lists';
import { CoreSelect } from '../../core';
import { Roles } from '@/types';
import { useTranslations } from 'next-intl';

interface IBaseSelectWithTranslate {
  role?: string;
  isLoading?: boolean;
  selected: ISelectOption;
  options: ISelectOption[];
  translation?: string;
  withTranslate?: boolean;
  placeholder: string;
  name: string;
  classNameWrapper?: string;
  classNameDropList?: string;
  onChange: (option: ISelectOption) => void;
}

export const BaseSelectWithTranslate = ({
  options,
  selected,
  onChange,
  classNameWrapper,
  classNameDropList,
  isLoading = false,
  translation,
  placeholder,
  withTranslate = false,
  role = Roles.MANAGER,
}: IBaseSelectWithTranslate) => {
  const [isActiveSelected, setIsActiveSelected] = useState<ISelectOption>(selected);
  const t = useTranslations(translation);

  const handleSelect = (value: ISelectOption) => {
    if (isActiveSelected?.id !== value.id) {
      setIsActiveSelected(value);
    }
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
        <BaseList
          options={options}
          isActiveSelected={isActiveSelected}
          onChange={handleSelect}
          setIsOpen={setIsOpen}
          t={translate}
        />
      )}
    />
  );
};
