import { ISelectOption, OptionValue } from '@/components/custom-select/types';

import { getStyle } from '../styles';

interface IBaseOption {
  id: string;
  value: OptionValue;
  classNameOption?: string;
  setIsOpen: (value: boolean) => void;
  activeSelected: ISelectOption | null;
  onSelect: (id: ISelectOption) => void;
  t: (value: OptionValue) => OptionValue;
}

export const BaseOption = ({ id, value, classNameOption, activeSelected, onSelect, setIsOpen, t }: IBaseOption) => {
  const isActive = activeSelected?.id === id;

  const style = getStyle({ classNameOption });

  const handleClick = () => {
    if (!isActive) {
      onSelect({ id, value } as ISelectOption);
    }
    setIsOpen(false);
  };

  return (
    <div className={style.wrapper} onClick={handleClick}>
      <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-lightBlue">
        {isActive && <div className="h-[10px] w-[10px] rounded-full bg-lightBlue" />}
      </div>

      <span className="text-dark-blue">{t(value)}</span>
    </div>
  );
};
