import { ISelectOption, OptionValue } from '@/components/custom-select/types';

import { getStyle } from '../styles';

interface IOptionList {
  id: string;
  value: OptionValue;
  classNameOption?: string;
  setIsOpen: (value: boolean) => void;
  activeSelected: ISelectOption | null;
  onSelect: (id: ISelectOption) => void;
}

export const OptionList = ({ id, value, classNameOption, activeSelected, onSelect, setIsOpen }: IOptionList) => {
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
      <div className="border-light-blue flex h-5 w-5 items-center justify-center rounded-full border-2">
        {isActive && <div className="bg-light-blue h-[10px] w-[10px] rounded-full" />}
      </div>

      <span className="text-dark-blue">{value}</span>
    </div>
  );
};
