import { ArrowUp } from '@/assets/icons';
import { ISelectOption } from '../../select-logic-wrapper/types';
import { getStyle } from './styles';

interface BaseTriggerProps {
  selected: ISelectOption | null;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  placeholder?: string;
  classNameSelected?: string;
}

export const BaseTrigger = ({ selected, isOpen, placeholder = 'Select...', classNameSelected }: BaseTriggerProps) => {
  const style = getStyle({ classNameSelected, placeholder, isOpen, value: selected?.value });

  return (
    <div className={style.wrapper}>
      {selected?.value || placeholder}
      <ArrowUp className={style.arrow} width={20} height={20} />
    </div>
  );
};
