import { Check } from '@/assets/icons';

import { getCheckboxStyles } from './getStyles';

interface IDropdownInputProps {
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DropdownInput = ({ checked, onChange }: IDropdownInputProps) => {
  const checkboxStyles = getCheckboxStyles(checked);

  return (
    <>
      <input type="checkbox" onChange={onChange} checked={checked} className="absolute appearance-none" />

      <span className="mr-[10px] flex h-[18px] w-[18px] items-center justify-center rounded-sm border-2 border-lightBlue">
        <Check className={checkboxStyles} />
      </span>
    </>
  );
};
