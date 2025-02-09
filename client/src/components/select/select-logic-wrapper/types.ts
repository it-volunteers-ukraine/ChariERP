export type OptionValue = string | boolean | number;

export interface ISelectOption {
  text: string;
  value: OptionValue;
}

export type ISelectOptionSelected = ISelectOption | ISelectOption[];

export interface ISelectLogicWrapperProps {
  multi?: boolean;
  isOpen: boolean;
  selected: ISelectOption;
  options: ISelectOption[];
  classNameWrapper?: string;
  classNameDropList?: string;
  setIsOpen: (a: boolean) => void;
  onChange: (option: ISelectOption) => void;
  renderOption: (option: ISelectOption) => React.ReactNode;
  renderSelected: (selected: ISelectOption) => React.ReactNode;
}
