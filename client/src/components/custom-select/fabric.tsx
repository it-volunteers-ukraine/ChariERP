import { ISelectFactory } from './types';
import { BaseSelectWithTranslate, SelectWithAddOptions } from './variant';

const variantsMap = {
  default: BaseSelectWithTranslate,
  'with-add-options': SelectWithAddOptions,
} as const;

export const SelectFactory = ({ variant = 'default', ...prop }: ISelectFactory) => {
  const Component = variantsMap[variant];

  return <Component {...prop} />;
};
