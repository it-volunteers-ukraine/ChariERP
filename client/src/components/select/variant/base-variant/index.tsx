import { useState } from 'react';

import { ISelectOption } from '../../select-logic-wrapper/types';
import { BaseTrigger } from '../../triggers';
import { BaseList } from '../../lists';
import { CoreSelect } from '../../core';
import { Roles } from '@/types';

interface IBaseSelect {
  userRole?: string;
  isLoading?: boolean;
  selected: ISelectOption;
  options: ISelectOption[];
  classNameWrapper?: string;
  classNameDropList?: string;
  onChange: (option: ISelectOption) => void;
}

export const BaseSelect = ({
  options,
  selected,
  onChange,
  classNameWrapper,
  classNameDropList,
  isLoading = false,
  userRole = Roles.MANAGER,
}: IBaseSelect) => {
  const [isActiveSelected, setIsActiveSelected] = useState<ISelectOption>(selected);

  const handleSelect = (value: ISelectOption) => {
    if (isActiveSelected?.id !== value.id) {
      setIsActiveSelected(value);
    }
  };

  return (
    <CoreSelect
      options={options}
      onChange={onChange}
      userRole={userRole}
      selected={selected}
      isLoading={isLoading}
      classNameWrapper={classNameWrapper}
      classNameDropList={classNameDropList}
      renderTrigger={({ selected, isOpen, setIsOpen }) => (
        <BaseTrigger selected={selected} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      renderList={({ options, selected, setIsOpen }) => (
        <BaseList options={options} selected={selected} onChange={handleSelect} setIsOpen={setIsOpen} />
      )}
    />
  );
};
