export type OptionValue = string | boolean | number;

export interface ISelectOption {
  id: string;
  value: OptionValue;
}

export type ISelectOptionSelected = ISelectOption | ISelectOption[];

export interface ISelectLogicWrapperProps {
  multi?: boolean;
  isOpen: boolean;
  isLoading: boolean;
  options: ISelectOption[];
  classNameWrapper?: string;
  classNameDropList?: string;
  setIsOpen: (a: boolean) => void;
  selected: ISelectOption | undefined;
  onChange: (option: ISelectOption) => void;
  renderOption: (option: ISelectOption) => React.ReactNode;
  renderSelected: (selected: ISelectOption) => React.ReactNode;
}
