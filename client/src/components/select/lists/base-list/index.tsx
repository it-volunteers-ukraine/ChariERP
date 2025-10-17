import { ISelectOption } from '../../select-logic-wrapper/types';
import { BaseOption } from './list';

interface BaseListProps {
  options: ISelectOption[];
  selected: ISelectOption | null;
  onChange: (value: ISelectOption) => void;
  setIsOpen: (value: boolean) => void;
}

export const BaseList = ({ options, selected, onChange, setIsOpen }: BaseListProps) => {
  console.log(selected);

  return (
    <ul className="flex flex-col gap-2 p-2">
      {options.map((option, idx) => (
        <BaseOption {...option} key={idx} isActiveSelected={selected} onSelect={onChange} setIsOpen={setIsOpen} />
      ))}
    </ul>
  );
};
