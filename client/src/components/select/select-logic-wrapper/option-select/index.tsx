import { getStyle } from './styles';
import { ISelectOption, OptionValue } from '../types';

interface IOptionSelect extends ISelectOption {
  classNameOption?: string;
  onSelect: (id: ISelectOption) => void;
  t: (value: OptionValue) => OptionValue;
  isActiveSelected: ISelectOption | null;
}

export const OptionSelect = ({ id, value, classNameOption, isActiveSelected, onSelect, t }: IOptionSelect) => {
  const isActive = isActiveSelected?.id === id;

  const style = getStyle({ classNameOption });

  const handleClick = () => {
    if (!isActive) {
      onSelect({ id } as ISelectOption);
    }
  };

  return (
    <div className={style.wrapper} onClick={handleClick}>
      <div className="border-light-blue flex h-5 w-5 items-center justify-center rounded-full border-2">
        {isActive && <div className="bg-light-blue h-[10px] w-[10px] rounded-full" />}
      </div>

      <span className="text-dark-blue">{t(value)}</span>
    </div>
  );
};
