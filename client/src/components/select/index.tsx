'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Selected } from './select-logic-wrapper/selected';
import { SelectLogicWrapper } from './select-logic-wrapper';
import { OptionSelect } from './select-logic-wrapper/option-select';
import { ISelectOption, OptionValue } from './select-logic-wrapper/types';

interface ISelect {
  name: string;
  placeholder: string;
  withTranslate?: boolean;
  selected: ISelectOption | undefined;
  options: ISelectOption[];
  classNameWrapper?: string;
  classNameDropList?: string;
  onChange: (option: ISelectOption) => void;
}

export const Select = ({
  options,
  selected,
  onChange,
  placeholder,
  withTranslate,
  classNameWrapper,
  classNameDropList,
}: ISelect) => {
  const t = useTranslations('select');
  const [isOpen, setIsOpen] = useState(false);
  const [isActiveSelected, setIsActiveSelected] = useState<{ value: OptionValue } | null>(null);

  const translate = (label: OptionValue) => (withTranslate ? t(label) : label);

  const handleSelect = (value: OptionValue) => {
    setIsActiveSelected((prev) => (prev?.value === value ? null : { value }));
  };

  return (
    <SelectLogicWrapper
      isOpen={isOpen}
      options={options}
      selected={selected}
      onChange={onChange}
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
