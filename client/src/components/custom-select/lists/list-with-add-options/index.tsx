import { useState } from 'react';

import { ISelectOption } from '../../types';

import { OptionList } from './option-list';

interface IListWithAddOptions {
  options: ISelectOption[];
  setIsOpen: (value: boolean) => void;
  activeSelected: ISelectOption | null;
  onChange: (value: ISelectOption) => void;
  onAddOption?: (option: ISelectOption) => void;
}

export const ListWithAddOptions = ({
  options,
  activeSelected,
  onChange,
  setIsOpen,
  onAddOption,
}: IListWithAddOptions) => {
  const [newOption, setNewOption] = useState('');

  const handleAdd = () => {
    if (!newOption.trim() || !onAddOption) {
      return;
    }

    const newItem = { id: Date.now().toString(), value: newOption.trim() };

    onAddOption(newItem);
    setNewOption('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div>
      <ul className="flex flex-col gap-2 p-2">
        {options.map((option, idx) => (
          <OptionList {...option} key={idx} activeSelected={activeSelected} onSelect={onChange} setIsOpen={setIsOpen} />
        ))}
      </ul>
      <input
        name="add"
        type="text"
        value={newOption}
        placeholder="+ Додати"
        onKeyDown={handleKeyDown}
        onChange={(e) => setNewOption(e.target.value)}
        className="w-full border-b border-gray-300 px-2 py-1 outline-none focus:bg-gray-50"
      />
    </div>
  );
};
