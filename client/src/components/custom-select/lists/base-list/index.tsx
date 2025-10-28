import { ISelectOption, OptionValue } from '../../types';
import { BaseOption } from './list';

interface BaseListProps {
  options: ISelectOption[];
  setIsOpen: (value: boolean) => void;
  activeSelected: ISelectOption | null;
  t: (value: OptionValue) => OptionValue;
  onChange: (value: ISelectOption) => void;
}

export const BaseList = ({ options, activeSelected, onChange, setIsOpen, t }: BaseListProps) => {
  return (
    <ul className="flex flex-col gap-2 p-2">
      {options.map((option, idx) => (
        <BaseOption
          t={t}
          key={idx}
          {...option}
          onSelect={onChange}
          setIsOpen={setIsOpen}
          activeSelected={activeSelected}
        />
      ))}
    </ul>
  );
};
