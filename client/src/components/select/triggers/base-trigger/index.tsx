import { ArrowUp } from '@/assets/icons';
import { OptionValue } from '../../select-logic-wrapper/types';
import { getStyle } from './styles';

interface IBaseTriggerProps {
  isOpen: boolean;
  placeholder: string;
  classNameSelected?: string;
  t: (value: OptionValue) => OptionValue;
  value?: OptionValue;
}

export const BaseTrigger = ({ value, isOpen, placeholder, classNameSelected, t }: IBaseTriggerProps) => {
  const style = getStyle({ classNameSelected, placeholder, isOpen, value });

  return (
    <div className={style.wrapper}>
      {!value ? placeholder : t(value)}
      <ArrowUp className={style.arrow} width={20} height={20} />
    </div>
  );
};
