import { ISelectOption, OptionValue } from '@/components/select/select-logic-wrapper/types';
import { getStyle } from '../styles';

interface IBaseOption extends ISelectOption {
  classNameOption?: string;
  onSelect: (id: ISelectOption) => void;
  t?: (value: OptionValue) => OptionValue;
  isActiveSelected: ISelectOption | null;
  setIsOpen: (value: boolean) => void;
}

export const BaseOption = ({ id, value, classNameOption, isActiveSelected, onSelect, setIsOpen }: IBaseOption) => {
  const isActive = isActiveSelected?.id === id;

  const style = getStyle({ classNameOption });

  const handleClick = () => {
    if (!isActive) {
      onSelect({ id } as ISelectOption);
    }
    setIsOpen(false);
  };

  return (
    <div className={style.wrapper} onClick={handleClick}>
      <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-lightBlue">
        {isActive && <div className="h-[10px] w-[10px] rounded-full bg-lightBlue" />}
      </div>

      <span className="text-dark-blue">{value}</span>
    </div>
  );
};
