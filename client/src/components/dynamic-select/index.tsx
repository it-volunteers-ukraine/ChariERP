'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { SelectLogicWrapper } from './select-logic-wrapper';
import { OptionBase } from './select-logic-wrapper/option-base';
import { SelectedBase } from './select-logic-wrapper/selected-base';
import { ISelectOption, OptionValue } from './select-logic-wrapper/types';

interface ICustomSelect {
  name: string;
  placeholder: string;
  withTranslate: boolean;
  selected: ISelectOption;
  options: ISelectOption[];
  onChange: (option: ISelectOption) => void;
}

export const DynamicSelect = ({ placeholder, options, selected, onChange, withTranslate }: ICustomSelect) => {
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
      classNameWrapper="border-arcticSky relative p-2 rounded-lg"
      classNameDropList="flex flex-col gap-y-2 left-0 top-full border border-b-[12px] scroll-textarea border-arcticSky bg-white py-2 px-4 "
      renderOption={(option) => (
        <OptionBase {...option} isActiveSelected={isActiveSelected} onSelect={handleSelect} t={translate} />
      )}
      renderSelected={(selected) => (
        <SelectedBase isOpen={isOpen} placeholder={placeholder} {...selected} t={translate} />
      )}
    />
  );
};
