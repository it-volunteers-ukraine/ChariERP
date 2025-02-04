import { ArrowUp } from '@/assets/icons';

import { ISelectOption, OptionValue } from '../types';
import { getStyle } from './style';

interface ISelectedBase extends ISelectOption {
  isOpen: boolean;
  placeholder: string;
  classNameSelectedBase?: string;
  t: (value: OptionValue) => OptionValue;
}

export const SelectedBase = ({ t, classNameSelectedBase, value, placeholder, isOpen }: ISelectedBase) => {
  const style = getStyle({ classNameSelectedBase, placeholder, isOpen, value });

  return (
    <div className={style.wrapper}>
      {!value ? placeholder : t(value)}

      <ArrowUp className={style.arrow} width={24} height={24} />
    </div>
  );
};
