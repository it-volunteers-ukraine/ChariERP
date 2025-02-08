import { getStyle } from './styles';
import { ISelectOption, OptionValue } from '../types';

interface IOptionSelect extends ISelectOption {
  classNameOption?: string;
  onSelect: (value: OptionValue) => void;
  t: (value: OptionValue) => OptionValue;
  isActiveSelected: { value: OptionValue } | null;
}

export const OptionSelect = ({ value, classNameOption, isActiveSelected, onSelect, t }: IOptionSelect) => {
  const isActive = isActiveSelected?.value === value;

  const style = getStyle({ classNameOption });

  return (
    <div className={style.wrapper} onClick={() => onSelect(value)}>
      <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-lightBlue">
        {isActive && <div className="h-[10px] w-[10px] rounded-full bg-lightBlue" />}
      </div>

      <span className="text-dark-blue">{t(value)}</span>
    </div>
  );
};
