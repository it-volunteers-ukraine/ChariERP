import { ArrowUp } from '@/assets/icons';

import { getStyle } from './styles';
import { ISelectOption, OptionValue } from '../types';

interface ISelected extends ISelectOption {
  isOpen: boolean;
  placeholder: string;
  classNameSelected?: string;
  t: (value: OptionValue) => OptionValue;
}

export const Selected = ({ t, classNameSelected, value, placeholder, isOpen }: ISelected) => {
  const style = getStyle({ classNameSelected, placeholder, isOpen, value });

  return (
    <div className={style.wrapper}>
      {!value ? placeholder : t(value)}

      <ArrowUp className={style.arrow} width={24} height={24} />
    </div>
  );
};
