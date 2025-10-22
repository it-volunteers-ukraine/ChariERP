import { ISelectOption, OptionValue } from '../../select-logic-wrapper/types';
import { BaseOption } from './list';

interface BaseListProps {
  options: ISelectOption[];
  isActiveSelected: ISelectOption | null;
  onChange: (value: ISelectOption) => void;
  setIsOpen: (value: boolean) => void;
  t: (value: OptionValue) => OptionValue;
}

export const BaseList = ({ options, isActiveSelected, onChange, setIsOpen, t }: BaseListProps) => {
  console.log(isActiveSelected);

  return (
    <ul className="flex flex-col gap-2 p-2">
      {options.map((option, idx) => (
        <BaseOption
          {...option}
          key={idx}
          t={t}
          isActiveSelected={isActiveSelected}
          onSelect={onChange}
          setIsOpen={setIsOpen}
        />
      ))}
    </ul>
  );
};
