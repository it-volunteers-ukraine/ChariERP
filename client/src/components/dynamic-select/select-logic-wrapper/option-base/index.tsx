import { ISelectOption, OptionValue } from '../types';
import { getStyle } from './styles';

interface IOptionBase extends ISelectOption {
  classNameOptionBase?: string;
  onSelect: (value: OptionValue) => void;
  t: (value: OptionValue) => OptionValue;
  isActiveSelected: { value: OptionValue } | null;
}

export const OptionBase = ({ value, classNameOptionBase, isActiveSelected, onSelect, t }: IOptionBase) => {
  const isActive = isActiveSelected?.value === value;

  const style = getStyle({ classNameOptionBase });

  return (
    <div className={style.wrapper} onClick={() => onSelect(value)}>
      <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-lightBlue">
        {isActive && <div className="h-[10px] w-[10px] rounded-full bg-lightBlue" />}
      </div>

      <span className="text-dark-blue">{t(value)}</span>
    </div>
  );
};
