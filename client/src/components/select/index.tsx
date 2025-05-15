'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Selected } from './select-logic-wrapper/selected';
import { SelectLogicWrapper } from './select-logic-wrapper';
import { OptionSelect } from './select-logic-wrapper/option-select';
import { ISelectOption, OptionValue } from './select-logic-wrapper/types';

interface ISelect {
  name: string;
  role?: string;
  isLoading: boolean;
  placeholder: string;
  translation?: string;
  withTranslate?: boolean;
  selected: ISelectOption;
  options: ISelectOption[];
  classNameWrapper?: string;
  classNameDropList?: string;
  onChange: (option: ISelectOption) => void;
}

export const Select = ({
  role,
  options,
  selected,
  onChange,
  isLoading,
  placeholder,
  translation,
  withTranslate,
  classNameWrapper,
  classNameDropList,
}: ISelect) => {
  const t = useTranslations(translation);
  const [isOpen, setIsOpen] = useState(false);
  const [isActiveSelected, setIsActiveSelected] = useState<ISelectOption | null>(selected);

  const translate = (label: OptionValue) => (withTranslate ? t(label) : label);

  useEffect(() => {
    setIsActiveSelected(selected);
  }, [selected]);

  const handleSelect = (value: ISelectOption) => {
    if (isActiveSelected?.id !== value.id) {
      setIsActiveSelected(value);
    }
  };

  return (
    <SelectLogicWrapper
      isOpen={isOpen}
      userRole={role}
      options={options}
      onChange={onChange}
      selected={selected}
      isLoading={isLoading}
      setIsOpen={setIsOpen}
      classNameWrapper={classNameWrapper}
      classNameDropList={classNameDropList}
      renderOption={(option) => {
        return <OptionSelect {...option} isActiveSelected={isActiveSelected} onSelect={handleSelect} t={translate} />;
      }}
      renderSelected={(selected) => {
        return <Selected isOpen={isOpen} placeholder={placeholder} {...selected} t={translate} />;
      }}
    />
  );
};
