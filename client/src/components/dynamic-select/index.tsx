'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { SelectLogicWrapper } from './select-logic-wrapper';
import { Option, Select, SwitchOption, SwitchSelect } from './config';
import { ISelectOption, OptionValue } from './select-logic-wrapper/types';

interface ICustomSelect {
  name: string;
  selectType?: Select;
  optionType?: Option;
  placeholder: string;
  withTranslate?: boolean;
  selected: ISelectOption;
  options: ISelectOption[];
  classNameWrapper?: string;
  classNameDropList?: string;
  onChange: (option: ISelectOption) => void;
}

export const DynamicSelect = ({
  options,
  selected,
  onChange,
  optionType,
  selectType,
  placeholder,
  withTranslate,
  classNameWrapper,
  classNameDropList,
}: ICustomSelect) => {
  const t = useTranslations('select');
  const [isOpen, setIsOpen] = useState(false);
  const [isActiveSelected, setIsActiveSelected] = useState<{ value: OptionValue } | null>(null);

  const translate = (label: OptionValue) => (withTranslate ? t(label) : label);

  const handleSelect = (value: OptionValue) => {
    setIsActiveSelected((prev) => (prev?.value === value ? null : { value }));
  };

  const SelectComponent = SwitchSelect(selectType);
  const OptionComponent = SwitchOption(optionType);

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
        return (
          <OptionComponent {...option} isActiveSelected={isActiveSelected} onSelect={handleSelect} t={translate} />
        );
      }}
      renderSelected={(selected) => {
        return <SelectComponent isOpen={isOpen} placeholder={placeholder} {...selected} t={translate} />;
      }}
    />
  );
};
