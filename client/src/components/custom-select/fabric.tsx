import React from 'react';

import { ISelectOption } from './types';
import { BaseSelectWithTranslate, SelectWithAddOptions } from './variant';

type VariantKey = 'default' | 'with-add-options';

interface ISelectFactory {
  name: string;
  role?: string;
  isLoading?: boolean;
  variant?: VariantKey;
  placeholder?: string;
  translation?: string;
  selected: ISelectOption;
  withTranslate?: boolean;
  options: ISelectOption[];
  classNameWrapper?: string;
  classNameDropList?: string;
  onChange: (value: ISelectOption) => void;
}

const variantsMap = {
  default: BaseSelectWithTranslate,
  'with-add-options': SelectWithAddOptions,
} as const;

export const SelectFactory = ({ variant = 'default', ...prop }: ISelectFactory) => {
  const Component = variantsMap[variant];

  return <Component {...prop} />;
};
